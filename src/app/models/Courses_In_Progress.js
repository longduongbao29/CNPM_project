const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursesInProgressSchema = new Schema({
    studentID: {
        type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: 'CourseInfo' },

    attendance_check: {
        type: Number
    }

}, { timestamps: true })

const Courses_In_Progress = mongoose.model('Courses_In_Progress', coursesInProgressSchema, 'courses_in_progress')

module.exports = Courses_In_Progress