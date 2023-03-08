const router = require('express').Router()
const {createNewUser} = require('../controllers/registerController')

router.post('/', createNewUser)

module.exports = router