const { StudentInfo } = require('../models/Models')
const { courses_in_progress } = require('./SiteController')

class AdminSiteController {
    async home(req, res) {
        res.render('admin_home')
    }

    async studentList(req, res, next) {
        let student
        await StudentInfo.find().then((student_) => {
            student = student_.map(student => student.toObject())

        })
        res.render('student_list', { student })
    }

    async addStudent(req, res, next) {
        res.render('add_student')
        //res.send('success')
    }
    async storeStudent(req, res, next) {
        const data = req.body
        const new_student = new StudentInfo(data)
        new_student.save()
        //res.json(req.body)
        //res.send('SAVED')
        res.redirect('/student-list')
        //alert('Thêm sinh viên thành công!')
    }

    async editStudent(req, res, next) {
        let student
        await StudentInfo.findById(req.params.id).then((student_) => {
            student = student_.toObject()
        })
        res.render('edit_student', { student })
    }

    async updateStudent(req, res, next) {
        StudentInfo.updateOne({_id: req.params.id}, req.body).then(()=> {
            res.redirect('/student-list')
        })
    }
}

module.exports = new AdminSiteController