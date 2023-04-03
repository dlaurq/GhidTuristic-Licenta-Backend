const express = require('express')
const router = express.Router()
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, promoteUserToPartner} = require('../../controllers/usersController')

router.route('/')
    .get(getAllUsers)
    .post(createUser)
    .patch(updateUser)

router.get('/:id', getUserById)

router.delete('/:username', deleteUser)

router.patch('/partener', promoteUserToPartner)

module.exports = router