const router = require('express').Router()
const {createToVisit, deleteToVisit, getAllToVisitByUser} = require('../../controllers/toVisitController')

router.get('/user/:id', getAllToVisitByUser)

router.post('/', createToVisit)

router.delete('/:username', deleteToVisit)

module.exports = router