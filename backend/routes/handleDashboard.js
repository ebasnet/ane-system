const express = require("express")

require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET //for sending auth token to logged in user

var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const RegistrationDataModel = require('../Modals/Registrations')
const userDataModel = require('../Modals/Userdata')

// ROUTE 1: Counting student data for graph
router.get('/graph', fetchUser, async (req, res) => {
    const userID = req.user.id
    const user = await userDataModel.findById(userID).select("-password");

    if (user.type === 'admin') {
        const class1 = await RegistrationDataModel.find({ class: '1', status: 'approved' })
        const class2 = await RegistrationDataModel.find({ class: '2', status: 'approved' })
        const class3 = await RegistrationDataModel.find({ class: '3', status: 'approved' })
        const class4 = await RegistrationDataModel.find({ class: '4', status: 'approved' })
        const class5 = await RegistrationDataModel.find({ class: '5', status: 'approved' })
        const class6 = await RegistrationDataModel.find({ class: '6', status: 'approved' })
        const class7 = await RegistrationDataModel.find({ class: '7', status: 'approved' })
        const class8 = await RegistrationDataModel.find({ class: '8', status: 'approved' })
        const class9 = await RegistrationDataModel.find({ class: '9', status: 'approved' })
        res.send([
            {
                class: 'Class 1', students: class1.length,
            },
            {
                class: 'Class 2', students: class2.length,
            },
            {
                class: 'Class 3', students: class3.length,
            },
            {
                class: 'Class 4', students: class4.length,
            },
            {
                class: 'Class 5', students: class5.length,
            },
            {
                class: 'Class 6', students: class6.length,
            },
            {
                class: 'Class 7', students: class7.length,
            },
            {
                class: 'Class 8', students: class8.length,
            },
            {
                class: 'Class 9', students: class9.length,
            }
        ])

    }
    if (user.type === 'user') {
        const form = await RegistrationDataModel.find({ userid: userID })
        res.send(form)
    }
})

// ROUTE 2: Get all forms data
router.get('/getForms', fetchUser, async (req, res) => {
    const userID = req.user.id
    const user = await userDataModel.findById(userID).select("-password");
    const searchText = req.query.searchText
    const status = req.query.status
    const formid = req.query.formid
    try {
        if (user.type === 'admin') {
            const query = { name: { $regex: searchText || '', $options: 'i' } };

            if (status) {
                query.status = status;
            }

            if (formid) {
                query._id = formid
            }

            const allForms = await RegistrationDataModel.find(query).sort({ name: 1 });
            const formCount = allForms.length

            res.send({ formCount, allForms })
        }
        if (user.type === 'user') {
            const query = {}
            if (formid) {
                query._id = formid
            } else {
                query.userid = userID
            }
            const allForms = await RegistrationDataModel.find(query)
            res.send({allForms})
        }
    } catch (error) {
        console.log("Server Error is /getForms :", error)
    }
})

// ROUTE 3: Get specific class students
router.put('/getStudents', fetchUser, async (req, res) => {
    const userID = req.user.id
    const user = await userDataModel.findById(userID).select("-password");

    if (user.type === 'admin') {
        const classValue = req.query.class
        const allForms = await RegistrationDataModel.find({ class: classValue, status: 'approved' })
        const formCount = allForms.length
        res.send({ formCount, allForms })
    }
    if (user.type === 'user') {
        const form = await RegistrationDataModel.find({ userid: userID })
        res.send(form)
    }
})

// ROUTE 4: Update Form Status (By admin only)
const sendApprovedMail = require("../sendApprovedMail");
router.post('/updateForm', fetchUser, async (req, res) => {
    const userID = req.user.id
    const { formID, formInput, status } = req.body
    const user = await userDataModel.findById(userID).select("-password");
    const form = await RegistrationDataModel.findById(formID);

    if (user.type === 'admin' && status === 'approved') {
        const FormUserDetails = await userDataModel.findById(form.userid.toString()).select("-password");
        const studentName = form.name
        const studentEmail = FormUserDetails.email
        try {
            await sendApprovedMail(studentName, studentEmail);
        } catch (error) {
            console.log(error)
        }
        
    }

    if (user.type==='admin' || user._id.toString() === form.userid.toString()) { //check if loggedin userid and userid in form is same
        const query = { _id: formID }
        if (status) {
            query.status = status
            query.date = Date.now()
        }
        if (formInput) {
            if (Object.keys(formInput).length > 0) { //update if somethingthing is edited in FORM
                const allForms = await RegistrationDataModel.findOneAndUpdate(query, formInput, { new: true })
                res.send(allForms)
            }
        }

        else { //only update status if nothing is editied in form
            const allForms = await RegistrationDataModel.findOneAndUpdate({ _id: formID }, query, { new: true })
            res.send(allForms)
        }
    } else {
        res.send(403).status("userID and userID in formdata doesn't match.")
    }

})

// ROUTE 5: Delete / Reject Form
const sendRejectedMail = require("../sendRejectedMail");
router.post('/deleteForm', fetchUser, async (req, res) => {
    const userID = req.user.id
    const { formID, deleteForever } = req.body
    const user = await userDataModel.findById(userID).select("-password");
    if (user.type === 'admin') {
        if (deleteForever) {
            const allForms = await RegistrationDataModel.findByIdAndDelete(formID, { new: true })
            res.send(allForms)

        } else {
            const allForms = await RegistrationDataModel.findByIdAndUpdate(formID, {status: 'rejected'}, { new: true })
            const FormUserDetails = await userDataModel.findById(allForms.userid.toString()).select("-password");
            console.log(FormUserDetails)
            const studentName = allForms.name
            const studentEmail = FormUserDetails.email
            sendRejectedMail(studentName, studentEmail)
            res.send(allForms)
        }
    }
    if (user.type === 'user') {
        const form = await RegistrationDataModel.find({ userid: userID })
        res.send(form)
    }
})



module.exports = router;