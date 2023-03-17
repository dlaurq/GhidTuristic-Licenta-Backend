const router = require('express').Router()
const { createPlace} = require('../../controllers/placeController')



router.post('/',createPlace)

module.exports = router