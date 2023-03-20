var express = require('express')
var router = express.Router()


const newController = require('../app/controllers/NewController')

router.use('/:slug', newController.show)
router.use('/', newController.index)



module.exports = router;