const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student_courseSchema = new Schema({
    studentID: {
        type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: 'CourseInfo' },
    finished: {
        type: Boolean
    },
    mark10: {
        type: Number
    },
    letter_ratings: {
        type: String
    },
    mark4: {
        type: Number
    },
    attendance_check: {
        type: Number
    }

}, { timestamps: true })

const Student_Course = mongoose.model('student_course', student_courseSchema, 'student_course')

module.exports = Student_Course