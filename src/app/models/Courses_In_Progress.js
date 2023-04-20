const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursesInProgressSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    course_ID: {
        type: String,
        required: true
    },


    attendance_check: {
        type: Number
    }

})

const Courses_In_Progress = mongoose.model('Courses_In_Progress', coursesInProgressSchema, 'courses_in_progress')

module.exports = Courses_In_Progress