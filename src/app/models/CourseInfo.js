const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseInfoSchema = new Schema({
    course_ID: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_credits: {
        type: Number,
        required: true
    },
    num_of_lessons: {
        type: Number,
        required: true
    },
    teacher_name: {
        type: String,
        required: true
    },
    num_of_pupils: {
        type: Number,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        required: true
    }
})

const CourseInfo = mongoose.model('CourseInfo', courseInfoSchema, 'course_infos')

module.exports = CourseInfo