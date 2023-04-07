const { StudentInfo } = require('../models/Models')
const { Student_Course } = require('../models/Models');
class SiteController {
    async home(req, res) {
        let id = req.session.userID
        let student
        // await StudentInfo.findOne({ studentID: id }).then(student_ => {
        //     student = student_.toObject()
        // })
        res.render('home', { student })
    }

    async attendance(req, res, next) {

        let id = req.session.userID
        let courses, student
        await Student_Course.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        res.render('attendance', { courses, student })

    }

    async courses_in_progress(req, res, next) {
        let id = req.session.userID
        let courses
        await Student_Course.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        res.render('courses_in_progress', { courses })
    }
    async completed_courses(req, res, next) {
        let id = req.session.userID
        let courses
        let sumMark = 0, creditsCount = 0, GPA
        await Student_Course.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        courses.forEach(course => {
            if (course.finished) {
                sumMark += course.mark4 * course.course.course_credits
                creditsCount += course.course.course_credits
            }

        })
        GPA = sumMark / creditsCount

        console.log(sumMark, creditsCount, GPA)
        res.render('completed_courses', { courses, GPA, creditsCount })
    }

    admin(req, res) {
        res.render('admin')

    }

    timetable(req, res) {
        res.render('timetable')
    }
}
module.exports = new SiteController