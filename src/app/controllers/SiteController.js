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

    async timetable(req, res) {
        let id = req.session.userID
        let courses
        await Student_Course.find({ studentID: id }).populate('course').then((courses_) => {
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
}

module.exports = new SiteController