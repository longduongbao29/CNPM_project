const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseInfoSchema = new Schema({
    course_ID: {
        type: String
    },
    course_name: {
        type: String
    },
    course_credits: {
        type: Number
    },
    num_of_lessons: {
        type: Number
    },
    teacher_name: {
        type: String
    },
    num_of_pupils: {
        type: Number
    },
    room: {
        type: String
    },
    date_time: {
        type: String
    }
}, { timestamps: true })

const CourseInfo = mongoose.model('CourseInfo', courseInfoSchema, 'course_info')

module.exports = CourseInfo