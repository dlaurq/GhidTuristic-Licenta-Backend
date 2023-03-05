const express = require('express')
const router = express.Router()
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../../controllers/usersController')

router.route('/')
    .get(getAllUsers)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

router.get('/:id', getUserById)


module.exports = router