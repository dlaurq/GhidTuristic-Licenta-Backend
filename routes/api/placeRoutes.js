const router = require('express').Router()
const { createPlace, getPlacesByUser, getPlaces, getPlace, deletePlace, updatePlace} = require('../../controllers/placeController')



router
    .get('/', getPlaces)
    .post('/',createPlace)

router.get('/user/:username', getPlacesByUser)

router.get('/:name', getPlace)

router.delete('/:id', deletePlace)
router.patch('/:id', updatePlace)

module.exports = router