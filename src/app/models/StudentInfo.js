const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentInfoSchema = new Schema({
    studentID: {
        type: String,
        required: true,
        match: [/^[0-9]{8}$/, 'Student ID must be 8 digits']
    },
    name: {
        type: String,
        required: true
    },
    course_class: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
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
    },
    image: {
        type: String
    }
}, { versionKey: false })

const StudentInfo = mongoose.model('Student_Info', studentInfoSchema, 'student_infos')

module.exports = StudentInfo