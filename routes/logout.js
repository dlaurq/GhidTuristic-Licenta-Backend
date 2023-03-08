const router = require('express').Router()
const {logout} = require('../controllers/authController')

router.get('/', logout)

module.exports = router