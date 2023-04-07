const mongoose = require('mongoose')
const Schema = mongoose.Schema

const completedCourseSchema = new Schema({
    studentID: {
        type: String,
    },
    course: { type: Schema.Types.ObjectId, ref: 'CourseInfo' },
    mark10: {
        type: Number
    },
    letter_ratings: {
        type: String
    },
    mark4: {
        type: Number
    }

}, { timestamps: true })

const Completed_Courses = mongoose.model('Completed_Courses', completedCourseSchema, 'completed_courses')

module.exports = Completed_Courses