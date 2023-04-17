const { StudentInfo } = require('../models/Models')
const { courses_in_progress } = require('./SiteController')

class AdminSiteController {
    async home(req, res) {
        res.render('home', { admin: true })
    }

    async studentList(req, res, next) {
        let student
        await StudentInfo.find().then((student_) => {
            student = student_.map(student => student.toObject())
        }).catch(next)
        res.render('student_list', { student })
    }

    async addStudent(req, res, next) {
        res.render('add_student')

    }
    async storeStudent(req, res, next) {
        const data = req.body
        const new_student = new StudentInfo(data)
        new_student.save()
        //res.json(req.body)
        //res.send('SAVED')
        res.redirect('/admin')
        //alert('Thêm sinh viên thành công!')
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
    async sidebar(req, res) {
        res.render('sidebar', { admin: true })
    }

}

module.exports = new AdminSiteController