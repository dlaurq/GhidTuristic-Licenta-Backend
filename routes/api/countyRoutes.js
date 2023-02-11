const router = require('express').Router()
const absRouter = require('express').Router()
const {getAllCounties,getCounty, createCounty, updateCounty, deleteCounty, getAllCountiesByCountry} = require('../../controllers/countyController')

absRouter.get('/',getAllCounties)
router.get('/',getAllCountiesByCountry)
router.get('/:id',getCounty)
router.post('/',createCounty)
router.patch('/',updateCounty)
router.delete('/',deleteCounty)


module.exports = {router, absRouter}