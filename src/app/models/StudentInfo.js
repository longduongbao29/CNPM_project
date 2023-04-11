const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentInfoSchema = new Schema({
    studentID: {
        type: String
    },
    name: {
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
    },
    image: {
        type: String
    }
}/*, { timestamps: true } */)

const StudentInfo = mongoose.model('Student_Info', studentInfoSchema, 'student_infos')

module.exports = StudentInfo