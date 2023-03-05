const router = require('express').Router()
const {getAllCounties,getCounty, createCounty, updateCounty, deleteCounty, getAllCountiesByCountry} = require('../../controllers/countyController')

router
    .get('/',getAllCounties)
    .post('/',createCounty)
    

router
    .get('/:id',getCounty)
    .patch('/:id',updateCounty)
    .delete('/:id',deleteCounty)

router.get('/country/:id',getAllCountiesByCountry)

module.exports = router