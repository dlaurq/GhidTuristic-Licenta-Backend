const express = require('express')
const router = express.Router()
const {getAllUsers, getUser, createUser, updateUser, deleteUser, promoteUserToPartner, changePw} = require('../../controllers/usersController')

router.route('/')
    .get(getAllUsers)
    .post(createUser)



router.get('/:username', getUser)

router.delete('/:username', deleteUser)

router.patch('/:username',updateUser)

router.patch('/partener/promote', promoteUserToPartner)

router.patch('/edit/password/:username', changePw)



module.exports = router