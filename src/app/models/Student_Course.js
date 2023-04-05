const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student_courseSchema = new Schema({
    studentID: {
        type: String,
    },
    finished: {
        type: Boolean
    },
    mark: {
        type: Number
    },
    attendance_check: {
        type: Number
    },
    course: { type: Schema.Types.ObjectId, ref: 'CourseInfo' }
}, { timestamps: true })

const Student_Course = mongoose.model('student_course', student_courseSchema, 'student_course')

module.exports = Student_Course