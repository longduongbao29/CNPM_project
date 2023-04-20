const CourseInfo = require('../models/CourseInfo')
const { StudentInfo } = require('../models/Models')
const { Completed_Courses } = require('../models/Models')
const { CoursesInProgress } = require('../models/Models')
const { User } = require("../models/Models")

const bcrypt = require('bcryptjs');

const moment = require('moment');

class SiteController {
    async home(req, res) {
        res.render('home')
    }

    async attendance(req, res, next) {
        let id = req.session.accountID
        let student, courses = []
        await CoursesInProgress.find({ studentID: id }).then((student_) => {
            student = student_.map(s => s.toObject());
        })
        await Promise.all(student.map(async (s) => {
            let courseID = s.course_ID;
            let course_ = await CourseInfo.findOne({ course_ID: courseID });
            if (course_) {
                course_ = course_.toObject()
            }
            let course = Object.assign({}, s, course_)
            courses.push(course)
        }))

        res.render('attendance', { courses })

    }

    async courses_in_progress(req, res, next) {
        let id = req.session.accountID
        let student, courses = []
        await CoursesInProgress.find({ studentID: id }).then((student_) => {
            student = student_.map(s => s.toObject());
        })
        await Promise.all(student.map(async (s) => {
            let courseID = s.course_ID;
            let course_ = await CourseInfo.findOne({ course_ID: courseID });
            if (course_) {
                course_ = course_.toObject()
            }
            let course = Object.assign({}, s, course_)
            courses.push(course)
        }))

        res.render('courses_in_progress', { courses })
    }
    async completed_courses(req, res, next) {
        let id = req.session.accountID
        let sumMark = 0, creditsCount = 0, GPA
        let student, courses = []
        await Completed_Courses.find({ studentID: id }).then((student_) => {
            student = student_.map(s => s.toObject());
        })
        await Promise.all(student.map(async (s) => {
            let courseID = s.course_ID;
            let course_ = await CourseInfo.findOne({ course_ID: courseID });
            if (course_) {
                course_ = course_.toObject()
            }
            let course = Object.assign({}, s, course_)
            courses.push(course)
        }))

        courses.forEach(course => {
            sumMark += course.mark4 * course.course_credits
            creditsCount += course.course_credits
        })
        GPA = sumMark / creditsCount


        res.render('completed_courses', { courses, GPA, creditsCount })
    }


    async timetable(req, res) {
        let id = req.session.accountID
        let student, courses = []
        await CoursesInProgress.find({ studentID: id }).then((student_) => {
            student = student_.map(s => s.toObject());
        })
        await Promise.all(student.map(async (s) => {
            let courseID = s.course_ID;
            let course_ = await CourseInfo.findOne({ course_ID: courseID });
            if (course_) {
                course_ = course_.toObject()
            }
            let course = Object.assign({}, s, course_)
            courses.push(course)
        }))
        let array = []

        array.push(["Monday", , , , , , , , , , , ,])
        array.push(["Tuesday", , , , , , , , , , , ,])
        array.push(["Wednesday", , , , , , , , , , , ,])
        array.push(["Thursday", , , , , , , , , , , ,])
        array.push(["Friday", , , , , , , , , , , ,])
        array.push(["Saturday", , , , , , , , , , , ,])

        for (const course of courses) {
            let splitArray = course.date_time.split(' ')
            let date = splitArray[0][1]
            let time = splitArray[1].split(',')

            for (const i of time) {
                array[date - 2][i] = {
                    course_name: course.course_name,
                    teacher_name: course.teacher_name,
                    room: course.room
                }
            }
        }

        res.render('timetable', { array })
    }

    async profile(req, res) {
        let id = req.session.accountID
        let student
        await StudentInfo.findOne({ studentID: id }).then((student_) => {
            student = student_.toObject()

        })
        let birthday = moment(student.date_of_birth).format('DD/MM/YYYY');
        student.date_of_birth = birthday
        res.render('profile', { student })
    }

    async sidebar(req, res) {
        res.render('sidebar')
    }

    async changePassword(req, res) {
        let currentPassword = req.body.currentpass, newpass1 = req.body.newpass1, newpass2 = req.body.newpass2

        console.log(currentPassword, newpass1, newpass2)
        let user = await User.findOne({ studentID: req.session.accountID })
        bcrypt.compare(currentPassword, user.password, function (err, result) {
            if (result) {
                if (newpass1 === newpass2) {
                    bcrypt.hash(newpass1, 10, function (err, password_) {
                        User.updateOne({ studentID: req.session.accountID }, {
                            username: req.session.accountID,
                            password: password_
                        }).then(() => {
                            res.sendStatus(200)
                        })
                    });
                }
                else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(402)
            }
        })

    }

}

module.exports = new SiteController