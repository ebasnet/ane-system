const express = require("express")

require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET //for sending auth token to logged in user

var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const RegistrationDataModel = require('../Modals/Registrations')

// ROUTE 1: Creating New User
router.post('/', fetchUser, async (req, res) => {
    const userID = req.user.id
    const formdata = { ...req.body, userid: userID };
    console.log(formdata)
        RegistrationDataModel.create(formdata). then (resp => {
            res.send("Account Created Successfully!")
            return
        })
        . catch(error => {
            console.log(error)
            res.status(409).send("Database write error")
            return
        })
})

module.exports = router;