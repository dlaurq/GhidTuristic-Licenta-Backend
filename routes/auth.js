const router = require('express').Router()
const {login, refresh, register, logout} = require('../controllers/authController')

router.post('/login', login)
router.post('/register', register)
router.get('/refresh', refresh)
router.get('/logout', logout)

module.exports = router