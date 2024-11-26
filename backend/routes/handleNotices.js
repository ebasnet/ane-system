const express = require("express")

require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET //for sending auth token to logged in user

var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const NoticesDataModel = require('../Modals/Notices')
const userDataModel = require('../Modals/Userdata')

// ROUTE 1: Sending Notices to all
router.post('/', fetchUser, async (req, res) => {
    const userID = req.user.id
    const user = await userDataModel.findById(userID).select("-password");

    const { formInput, type } = req.body;
    const allformdata = { ...formInput, type }

    if (user.type === 'admin') {
        NoticesDataModel.create(allformdata)
            .then(resp => {
                res.send("Message sent")
                return
            })
            .catch(error => {
                console.log(error)
                res.status(409).send("Database write error")
                return
            })
    } else if (user.type === 'user') {
        res.status(403).send("Permission Denied")
    }
})

// ROUTE 2: Getting all Notices in dashboard
router.get('/getNotices', fetchUser, async (req, res) => {
    const formid = req.query.formid
    query = {}
    if (formid) {
        if (Object.keys(formid).length > 0) {
            query._id = req.query.formid;
        }
    }
    console.log(query)
    const allNotices = await NoticesDataModel.find(query)
    const NoticesCount = allNotices.length
    res.send({ allNotices, NoticesCount })

})

// ROUTE 3: Delete a notice
router.post('/deleteNotes', fetchUser, async (req, res) => {
    const userID = req.user.id
    const user = await userDataModel.findById(userID).select("-password");

    if (user.type === 'admin') {
        const { formid } = req.body
        await NoticesDataModel.findByIdAndDelete({_id: formid})
        res.send("Deleted")
    }
    if (user.type === 'user') {


    }
})

module.exports = router;