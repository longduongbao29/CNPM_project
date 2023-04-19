const { StudentInfo, CoursesInProgress, Completed_Courses } = require('../models/Models')
const { User } = require('../models/Models')

const moment = require('moment');

const bcrypt = require('bcryptjs');
const CourseInfo = require('../models/CourseInfo');
const { courses_in_progress } = require('./SiteController');

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
            student = Object.assign({}, c, student)
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

    async completeCourse(req, res, next) {

        const studentid = req.params.studentid
        const courseid = req.params.courseid
        let mark = getMark(req.body.mark1, req.body.mark2, req.body.mark3);
        let m10 = mark[0], m4 = mark[1], ltrt = mark[2]



        const complete_course = new Completed_Courses({
            studentID: studentid,
            course_ID: courseid,
            mark10: m10,
            mark4: m4,
            letter_ratings: ltrt
        })
        try {
            await complete_course.save()
            await CoursesInProgress.deleteOne({ studentID: studentid })
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(404)
        }



    }
    async addStudentToCourse(req, res, next) {
        const studentid = req.body.studentid
        const courseid = req.params.courseid
        let exist = await CoursesInProgress.findOne({ studentid: studentid })
        console.log(exist)
        if (exist) {
            return res.sendStatus(400)
        }

        const new_student = new CoursesInProgress({
            studentID: studentid,
            course_ID: courseid,
            attendance_check: 0
        })

        try {
            await new_student.save()
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(404)
        }
    }

    async deleteStudentInCourse(req, res) {
        try {
            await CoursesInProgress.deleteOne({ studentID: req.params.studentid, course_ID: req.params.courseid });
            await Completed_Courses.deleteOne({ studentID: req.params.studentid, course_ID: req.params.courseid });
            res.sendStatus(200)

        } catch (err) {
            res.sendStatus(404)
        }
    }

    async updateMark(req, res, next) {
        let mark = getMark(req.body.mark1, req.body.mark2, req.body.mark3);
        console.log(mark)
        let update_mark = {
            studentID: req.params.studentid,
            course_ID: req.params.courseid,
            mark10: mark[0],
            mark4: mark[1],
            letter_ratings: mark[2]
        }
        try {
            await Completed_Courses.updateOne({ studentID: req.params.studentid, course_ID: req.params.courseid }, update_mark);
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(404)
        }

    }
}

function getMark(mark1, mark2, mark3) {
    let m10, m4, ltrt
    m10 = 0.1 * mark1 + 0.3 * mark2 + 0.6 * mark3
    m10.toFixed(2)
    if (m10 < 4.0) {
        ltrt = 'F'
        m4 = 0;
    } else if (m10 >= 4.0 && m10 < 5) {
        ltrt = 'D'
        m4 = 1.0;
    } else if (m10 >= 5.0 && m10 < 5.5) {
        ltrt = 'D+'
        m4 = 1.5;
    } else if (m10 >= 5.5 && m10 < 6.5) {
        ltrt = 'C'
        m4 = 2;
    } else if (m10 >= 6.5 && m10 < 7) {
        ltrt = 'C+'
        m4 = 2.5;
    } else if (m10 >= 7 && m10 < 8) {
        ltrt = 'B'
        m4 = 3;
    } else if (m10 >= 8 && m10 < 8.5) {
        ltrt = 'B+'
        m4 = 3.5;
    } else if (m10 >= 8.5 && m10 < 9) {
        ltrt = 'A'
        m4 = 3.7;
    } else if (m10 >= 9) {
        ltrt = 'A+'
        m4 = 4.0;

    }

    return [m10, m4, ltrt]
}
module.exports = new AdminSiteController