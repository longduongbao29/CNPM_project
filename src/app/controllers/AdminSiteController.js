const { StudentInfo, CoursesInProgress, Completed_Courses } = require('../models/Models')
const { User } = require('../models/Models')
const { mongoose } = require('mongoose')

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
        try {
            const data = req.body
            let student = await StudentInfo.findOne({ studentID: req.body.studentID })
            if (student) {
                return res.sendStatus(402)
            }

            const new_student = new StudentInfo(data)
            await new_student.validate();
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

            res.sendStatus(200)
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {
                res.status(500).send({ error: 'Internal server error' });
            }
        }
    }

    async storeCourse(req, res, next) {
        try {
            const data = req.body
            const new_course = new CourseInfo(data)
            await new_course.validate();
            new_course.save()
            res.sendStatus(200)
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {
                res.status(500).send({ error: 'Internal server error' });
            }
        }
    }

    async getStudent(req, res, next) {
        let student = await StudentInfo.findById(req.params.id)
        student = student.toObject()
        res.json(student)
    }

    async getCourse(req, res, next) {
        let course = await CourseInfo.findById(req.params.id)
        course = course.toObject()
        res.json(course)


    }

    async updateStudent(req, res, next) {
        let studentid = req.body.studentID
        if (studentid.length !== 8)
            return res.status(401).send({ error: 'Student ID must be 8 characters long' })


        StudentInfo.updateOne({ _id: req.params.id }, req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {

                res.status(500).send({ error: 'Internal server error' });
            }
        })
    }

    async updateCourse(req, res, next) {
        try {
            await CourseInfo.updateOne({ _id: req.params.id }, req.body)
            res.sendStatus(200)
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {

                res.status(500).send({ error: 'Internal server error' });
            }
        }

    }

    async deleteStudent(req, res, next) {
        try {
            let student = await StudentInfo.findByIdAndRemove(req.params.id)
            await User.deleteOne({ studentID: student.studentID })

            res.sendStatus(200)
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {

                res.status(500).send({ error: 'Internal server error' });
            }
        }
    }

    async deleteCourse(req, res, next) {
        try {
            await CourseInfo.deleteOne({ _id: req.params.id });
            res.sendStatus(200)
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send({ error: err.message });
            } else {

                res.status(500).send({ error: 'Internal server error' });
            }
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
        courses = await CoursesInProgress.find({ course_ID: courseID })
        courses = courses.map(course => course.toObject());

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
        courses = await Completed_Courses.find({ course_ID: courseID })
        courses = courses.map(course => course.toObject());
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
        let course = await CourseInfo.findById(req.params.id)
        course = course.toObject()
        res.render('course_info', { course })

    }

    async completeCourse(req, res, next) {

        const studentid = req.params.studentid
        const courseid = req.params.courseid
        let mark1 = req.body.mark1, mark2 = req.body.mark2, mark3 = req.body.mark3

        if (mark1 < 0 || mark2 < 0 || mark3 < 0 || mark1 > 10 || mark2 > 10 || mark3 > 10) {
            return res.sendStatus(402)
        }

        let mark = getMark(mark1, mark2, mark3);
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
            await CoursesInProgress.deleteOne({ studentID: studentid, course_ID: courseid })
            res.sendStatus(200)
        } catch (err) {
            res.sendStatus(404)
        }



    }
    async addStudentToCourse(req, res, next) {
        const studentid = req.body.studentid
        const courseid = req.params.courseid

        let exist = await CoursesInProgress.findOne({ studentID: studentid, course_ID: courseid })
        if (exist) {
            return res.sendStatus(400)
        }
        let find = await StudentInfo.findOne({ studentID: studentid })
        if (!find) {
            return res.sendStatus(401)
        }

        const new_student = new CoursesInProgress({
            studentID: studentid,
            course_ID: courseid,
            attendance_check: 0
        })

        try {
            await new_student.save()
            res.sendStatus(200)
        } catch (err) {
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
        let mark1 = req.body.mark1, mark2 = req.body.mark2, mark3 = req.body.mark3

        if (mark1 < 0 || mark2 < 0 || mark3 < 0 || mark1 > 10 || mark2 > 10 || mark3 > 10) {
            return res.sendStatus(402)
        }

        let mark = getMark(mark1, mark2, mark3);
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
        } catch (err) {
            res.sendStatus(404)
        }

    }
}

function getMark(mark1, mark2, mark3) {
    let m10, m4, ltrt
    m10 = 0.1 * mark1 + 0.3 * mark2 + 0.6 * mark3

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
    m10 = m10.toFixed(2)
    return [m10, m4, ltrt]
}
module.exports = new AdminSiteController