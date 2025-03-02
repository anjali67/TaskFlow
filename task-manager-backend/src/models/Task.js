const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title:{type:String, required: true},
    description:{type: String , required: true},
    user:{type:mongoose.Schema.ObjectId ,ref: 'User',required: true}
})

module.exports = mongoose.model('Task',taskSchema)