const router = require('express').Router()
const { createPlace, getPlacesByUser, getPlaces, getPlace} = require('../../controllers/placeController')



router
    .get('/', getPlaces)
    .post('/',createPlace)

router.get('/user/:username', getPlacesByUser)

router.get('/:name', getPlace)

module.exports = router