var express = require('express')
var router = express.Router()


const adminSiteController = require('../app/controllers/AdminSiteController')
const authenticate = require('../app/middleware/authenticate')
const AuthController = require('../app/controllers/AuthController')

// Cần yêu cầu đăng nhập mới vào được các trang dưới
router.get('/admin-home', AuthController.loginRequired, authenticate, adminSiteController.home)


module.exports = router