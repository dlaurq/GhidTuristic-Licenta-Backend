const router = require('express').Router()
const { getGeo } = require('../../controllers/geoController')

router.get('/', getGeo)

module.exports = router