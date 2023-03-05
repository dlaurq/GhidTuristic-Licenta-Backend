const router = require('express').Router()
const {login, register, logout} = require('../../controllers/authController')
const loginLimiter = require('../../middleware/loginLimiter')

router.post('/login',loginLimiter, login)
router.get('/logout',logout)

module.exports = router