var express = require('express')
var router = express.Router()


const siteController = require('../app/controllers/SiteController')
// const authenticate = require('../app/middleware/authenticate')
const AuthController = require('../app/controllers/AuthController')

router.get('/', AuthController.loginRequired, siteController.home)
router.get('/home', AuthController.loginRequired, siteController.home)
router.get('/attendance', AuthController.loginRequired, siteController.attendance)


module.exports = router