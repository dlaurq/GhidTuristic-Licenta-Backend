const express = require('express')
const router = express.Router()
const {getAllUsers, getUserById, createUser} = require('../../controllers/usersController')

router.get('/', getAllUsers)
router.get('/:id', getUserById)

router.post('/', createUser)

module.exports = router