const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    studentID: {
        type: String
    },
    student_name: {
        type: String
    },
    course_class: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    sex: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone_number: {
        type: String
    }
}, { timestamps: true })

const CourseInfo = mongoose.model('User', userSchema)

module.exports = CourseInfo