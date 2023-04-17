const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseInfoSchema = new Schema({
    course_ID: {
        type: String
    },
    name: {
        type: String
    },
    credits: {
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
})

const CourseInfo = mongoose.model('CourseInfo', courseInfoSchema, 'course_infos')

module.exports = CourseInfo