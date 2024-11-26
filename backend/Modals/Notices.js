const mongoose = require("mongoose")

const NoticeDataSchema = new mongoose.Schema({
    title: String,
    message: String,
    type: String,
    userid: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now }
})
const NoticesDataModel = mongoose.model("notice", NoticeDataSchema)

module.exports=NoticesDataModel