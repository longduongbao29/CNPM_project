const { Student_Course } = require('../models/Models');
class SiteController {
    home(req, res) {
        res.render('home')
    }

    attendance(req, res, next) {
        let id = req.session.userID
        Student_Course.find({ studentID: id }).populate('course').then(courses => {
            courses = courses.map(course => course.toObject())
            res.render('attendance', { courses })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })


    }
}
module.exports = new SiteController