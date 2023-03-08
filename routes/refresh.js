const router = require('express').Router()
const {refresh} = require('../controllers/authController');

router.get('/', refresh)

module.exports = router