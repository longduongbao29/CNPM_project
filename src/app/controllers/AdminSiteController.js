const { StudentInfo, CoursesInProgress, Completed_Courses } = require('../models/Models')
const { User } = require('../models/Models')

const moment = require('moment');

const bcrypt = require('bcryptjs');
const CourseInfo = require('../models/CourseInfo');

class AdminSiteController {
    async home(req, res) {
        res.render('home', { admin: true })
    }
    async sidebar(req, res) {
        res.render('sidebar', { admin: true })
    }

    async studentList(req, res, next) {
        let student
        await StudentInfo.find().then((student_) => {
            student = student_.map(student => student.toObject())
        }).catch(next)
        res.render('student_list', { student })
    }
    async courseList(req, res, next) {
        let courses
        await CourseInfo.find().then((courses_) => {
            courses = courses_.map(c => c.toObject())
        }).catch(next)
        res.render('course_list', { courses })
    }

    async storeStudent(req, res, next) {
        const data = req.body
        const new_student = new StudentInfo(data)
        new_student.save()


        let password_ = req.body.date_of_birth
        password_ = moment(password_).format('DD/MM/YYYY');
        password_ = password_.replace(/\//g, "")
        bcrypt.hash(password_, 10, function (err, password) {
            const user = {
                studentID: req.body.studentID,
                password: password
            }
            const new_user = new User(user)
            new_user.save()
        });

        res.redirect('/admin')

    }

    async storeCourse(req, res, next) {
        const data = req.body
        const new_course = new CourseInfo(data)
        new_course.save()
        res.redirect('/admin')
    }

    async getStudent(req, res, next) {
        let student
        await StudentInfo.findById(req.params.id).then((student_) => {
            student = student_.toObject()
            res.json(student)
        }).catch(next)

    }

    async getCourse(req, res, next) {
        let course
        await CourseInfo.findById(req.params.id).then((course_) => {
            course = course_.toObject()
            res.json(course)
        }).catch(next)

    }

    async editStudent(req, res, next) {
        let student
        await StudentInfo.findById(req.params.id).then((student_) => {
            student = student_.toObject()
        }).catch(next)
        res.render('edit_student', { student })
    }

    async editCourse(req, res, next) {
        let course
        await CourseInfo.findById(req.params.id).then((course_) => {
            course = course_.toObject()
        }).catch(next)
        res.render('edit_course', { course })
    }

    async updateStudent(req, res, next) {
        StudentInfo.updateOne({ _id: req.params.id }, req.body).then(() => {
            res.redirect('/admin')
        }).catch(next)
    }

    async updateCourse(req, res, next) {
        CourseInfo.updateOne({ _id: req.params.id }, req.body).then(() => {
            res.redirect('/admin')
        }).catch(next)
    }

    async deleteStudent(req, res, next) {
        try {
            await StudentInfo.deleteOne({ _id: req.params.id });
            res.redirect('/admin')

        } catch (err) {
            next(err);
        }
    }

    async deleteCourse(req, res, next) {
        try {
            await CourseInfo.deleteOne({ _id: req.params.id });
            res.redirect('/admin')

        } catch (err) {
            next(err);
        }
    }

    async studentInProgress(req, res, next) {
        let id = req.params.id;
        let courseID
        await CourseInfo.findById(id).then(course => {
            if (course) {
                courseID = course.course_ID
            }
        }
        )
        console.log(courseID)
        let students = [], courses
        await CoursesInProgress.find({ course_ID: courseID }).then(courses_ => {
            courses = courses_.map(course => course.toObject());
        })
        await Promise.all(courses.map(async (c) => {
            let studentid = c.studentID;
            let student = await StudentInfo.findOne({ studentID: studentid });
            if (student) {
                student = student.toObject()
            }
            students.push(student)
        }))


        res.render('student_in_progress', { students })

    }
    async studentCompleted(req, res, next) {
        let id = req.params.id;
        let courseID
        await CourseInfo.findById(id).then(course => {
            if (course) { courseID = course.course_ID }

        }
        )
        let students = [], courses
        await Completed_Courses.find({ course_ID: courseID }).then(courses_ => {
            courses = courses_.map(course => course.toObject());
        })
        await Promise.all(courses.map(async (c) => {
            let studentid = c.studentID;
            let student = await StudentInfo.findOne({ studentID: studentid });
            if (student) {
                student = student.toObject()
            }
            students.push(student)
        }))


        res.render('student_completed', { students })
    }

    async courseInfo(req, res, next) {
        await CourseInfo.findById(req.params.id).then(course => {
            course = course.toObject()
            res.render('course_info', { course })
        })


    }
}

module.exports = new AdminSiteController