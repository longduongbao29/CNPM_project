var express = require('express')
var router = express.Router()


const adminSiteController = require('../app/controllers/AdminSiteController')
const authenticate = require('../app/middleware/authenticate')
const AuthController = require('../app/controllers/AuthController')

// Cần yêu cầu đăng nhập mới vào được các trang dưới
router.get('/admin', AuthController.loginRequired, authenticate, adminSiteController.sidebar)

router.get('/student-list', AuthController.loginRequired, authenticate, adminSiteController.studentList)
router.get('/course-list', AuthController.loginRequired, authenticate, adminSiteController.courseList)

router.post('/store-student', AuthController.loginRequired, authenticate, adminSiteController.storeStudent)
router.post('/store-course', AuthController.loginRequired, authenticate, adminSiteController.storeCourse)

router.get('/:id/edit-student', AuthController.loginRequired, authenticate, adminSiteController.editStudent)
router.get('/:id/edit-course', AuthController.loginRequired, authenticate, adminSiteController.editCourse)

router.put('/:id/update-student', AuthController.loginRequired, authenticate, adminSiteController.updateStudent)
router.put('/:id/update-course', AuthController.loginRequired, authenticate, adminSiteController.updateCourse)

router.delete('/:id/delete-student', AuthController.loginRequired, authenticate, adminSiteController.deleteStudent)
router.delete('/:id/delete-course', AuthController.loginRequired, authenticate, adminSiteController.deleteCourse)

router.get('/student/:id', AuthController.loginRequired, authenticate, adminSiteController.getStudent)
router.get('/course/:id', AuthController.loginRequired, authenticate, adminSiteController.getCourse)
module.exports = router