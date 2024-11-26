const mongoose = require("mongoose")

const registrationDataSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    marks: String,
    class: Number,
    parentName: String,
    parentContact: Number,
    prevSchool: String,
    prevSchoolAddr: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: Number,
    status: { type: String, default: "pending" },
    userid: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now }
})
const RegistrationDataModel = mongoose.model("registration-form", registrationDataSchema)

module.exports=RegistrationDataModel