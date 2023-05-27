const router = require('express').Router()
const {getRecomandari} = require('../controllers/recomandariController')

router.get('/',  getRecomandari)

module.exports = router