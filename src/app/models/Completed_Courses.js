const mongoose = require('mongoose')
const Schema = mongoose.Schema

const completedCourseSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    course_ID: {
        type: String,
        required: true
    },
    mark10: {
        type: Number,
        required: true
    },
    letter_ratings: {
        type: String,
        required: true
    },
    mark4: {
        type: Number,
        required: true
    }

})

const Completed_Courses = mongoose.model('Completed_Courses', completedCourseSchema, 'completed_courses')

module.exports = Completed_Courses