const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    studentID: {
        type: String
    },
    password: {
        type: String
    },
    student_info: {
        type: Schema.Types.ObjectId,
        ref : 'StudentInfo'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema,'users')

module.exports = User