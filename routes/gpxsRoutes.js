const router = require('express').Router()
const {getGpx} = require('../controllers/gpxsController');

router.get('/:id', getGpx)

module.exports = router