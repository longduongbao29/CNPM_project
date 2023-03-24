var express = require('express')
var router = express.Router()


const siteController = require('../app/controllers/RegisterController')


router.get('/', siteController.register)



module.exports = router;