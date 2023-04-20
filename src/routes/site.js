var express = require('express')
var router = express.Router()


const siteController = require('../app/controllers/SiteController')
const authenticate = require('../app/middleware/authenticate')
const AuthController = require('../app/controllers/AuthController')

// Cần yêu cầu đăng nhập mới vào được các trang dưới
router.get('/', AuthController.loginRequired, siteController.sidebar)
router.get('/home', AuthController.loginRequired, siteController.home)
router.get('/attendance', AuthController.loginRequired, siteController.attendance)
router.get('/completed-courses', AuthController.loginRequired, siteController.completed_courses)
router.get('/courses-in-progress', AuthController.loginRequired, siteController.courses_in_progress)
router.get('/timetable', AuthController.loginRequired, siteController.timetable)
router.get('/profile', AuthController.loginRequired, siteController.profile)
router.put('/change-password', AuthController.loginRequired, siteController.changePassword)

module.exports = router