const { StudentInfo } = require('../models/Models')
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
    async getStudent(req, res, next) {
        let student
        await StudentInfo.findById(req.params.id).then((student_) => {
            student = student_.toObject()
            res.json(student)
        }).catch(next)

    }
    async editStudent(req, res, next) {
        let student
        await StudentInfo.findById(req.params.id).then((student_) => {
            student = student_.toObject()
        }).catch(next)
        res.render('edit_student', { student })
    }

    async updateStudent(req, res, next) {
        StudentInfo.updateOne({ _id: req.params.id }, req.body).then(() => {
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
}

module.exports = new AdminSiteController