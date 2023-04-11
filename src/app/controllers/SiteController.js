const { StudentInfo } = require('../models/Models')
const { Completed_Courses } = require('../models/Models')
const { CoursesInProgress } = require('../models/Models')
class SiteController {
    async home(req, res) {
        res.render('home')
    }

    async attendance(req, res, next) {

        let id = req.session.accountID
        let courses
        await CoursesInProgress.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        for (let course of courses) {
            console.log(course)
        }
        res.render('attendance', { courses })

    }

    async courses_in_progress(req, res, next) {
        let id = req.session.accountID
        let courses
        await CoursesInProgress.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        res.render('courses_in_progress', { courses })
    }
    async completed_courses(req, res, next) {
        let id = req.session.accountID
        let courses
        let sumMark = 0, creditsCount = 0, GPA
        await Completed_Courses.find({ studentID: id }).populate('course').populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        courses.forEach(course => {
            sumMark += course.mark4 * course.course.course_credits
            creditsCount += course.course.course_credits
        })
        GPA = sumMark / creditsCount

        console.log(sumMark, creditsCount, GPA)
        res.render('completed_courses', { courses, GPA, creditsCount })
    }



    async timetable(req, res) {
        let id = req.session.accountID
        let courses
        await CoursesInProgress.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        let array = []

        array.push(["Monday", , , , , , , , , , , ,])
        array.push(["Tuesday", , , , , , , , , , , ,])
        array.push(["Wednesday", , , , , , , , , , , ,])
        array.push(["Thursday", , , , , , , , , , , ,])
        array.push(["Friday", , , , , , , , , , , ,])
        array.push(["Saturday", , , , , , , , , , , ,])

        for (const course of courses) {
            let splitArray = course.course.date_time.split(' ')
            let date = splitArray[0][1]
            let time = splitArray[1].split(',')

            for (const i of time) {
                array[date - 2][i] = {
                    course_name: course.course.course_name,
                    teacher_name: course.course.teacher_name,
                    room: course.course.room
                }
            }
        }

        res.render('timetable', { array })
    }

    async profile(req, res) {
        let id = req.session.accountID
        let student
        await StudentInfo.find({ studentID: id }).then((student_) => {
            student = student_.map(student => student.toObject())

        })
        res.render('profile', { student })
    }

    async wrapper(req, res) {
        res.render('sidebar')
    }

}

module.exports = new SiteController