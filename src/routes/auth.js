// Xử lý route đăng nhập/ đăng xuất
const express = require('express')
const router = express.Router()

const AuthController = require('../app/controllers/AuthController')
const authenticate = require('../app/middleware/authenticate')

router.post('/login', AuthController.login)
router.post('/logout', AuthController.loginRequired, AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)
router.get('/login-page', AuthController.render)

module.exports = router