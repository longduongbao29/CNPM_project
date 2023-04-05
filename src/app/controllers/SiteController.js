const { StudentInfo } = require('../models/Models')
const { Student_Course } = require('../models/Models');
class SiteController {
    home(req, res) {
        res.render('home')
    }

    async attendance(req, res, next) {

        let id = req.session.userID
        var courses, student
        await Student_Course.find({ studentID: id }).populate('course').then((courses_) => {
            courses = courses_.map(course => course.toObject())

        })
        await StudentInfo.findOne({ studentID: id }).then(student_ => {
            student = student_.toObject()
        })
        res.render('attendance', { courses, student })

    }
}
module.exports = new SiteController