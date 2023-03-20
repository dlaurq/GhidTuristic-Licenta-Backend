const router = require('express').Router()
const { createPlace, getPlacesByUser} = require('../../controllers/placeController')



router.post('/',createPlace)

router.get('/user/:username', getPlacesByUser)


module.exports = router