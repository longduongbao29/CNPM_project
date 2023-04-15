var express = require('express')
var router = express.Router()


const adminSiteController = require('../app/controllers/AdminSiteController')
const authenticate = require('../app/middleware/authenticate')
const AuthController = require('../app/controllers/AuthController')

// Cần yêu cầu đăng nhập mới vào được các trang dưới
router.get('/admin', AuthController.loginRequired, authenticate, adminSiteController.home)
router.get('/student-list', AuthController.loginRequired, authenticate, adminSiteController.studentList)
router.get('/add-student', AuthController.loginRequired, authenticate, adminSiteController.addStudent)
router.post('/store-student', AuthController.loginRequired, authenticate, adminSiteController.storeStudent)
router.get('/:id/edit-student', AuthController.loginRequired, authenticate, adminSiteController.editStudent)
router.put('/:id', AuthController.loginRequired, authenticate, adminSiteController.updateStudent)
router.delete('/:id', AuthController.loginRequired, authenticate, adminSiteController.deleteStudent)
module.exports = router