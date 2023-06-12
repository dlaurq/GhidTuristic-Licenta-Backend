const router = require('express').Router()
const {createVisited, deleteVisited, getAllVisitedByUser} = require('../../controllers/visitedController')

router.get('/user/:id', getAllVisitedByUser)

router.post('/', createVisited)

router.delete('/:id', deleteVisited)

module.exports = router