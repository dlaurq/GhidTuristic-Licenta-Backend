const router = require('express').Router()
const {createToVisit, deleteToVisit, getAllToVisitByUser, updateList} = require('../../controllers/toVisitController')

router.get('/user/:id', getAllToVisitByUser)

router.post('/', createToVisit)

router.delete('/:id', deleteToVisit)

router.patch('/:list/:entity', updateList)

module.exports = router