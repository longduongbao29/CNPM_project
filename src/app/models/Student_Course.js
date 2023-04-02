const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    studentID: {
        type: String,
    },
    course_ID: {
        type: String
    },
    finished: {
        type: Boolean
    },
    atendance_check: {
        type: Number
    },
    mark: {
        type: Number
    }
}, { timestamps: true })

const CourseInfo = mongoose.model('User', userSchema)

module.exports = CourseInfo