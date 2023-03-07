const router = require('express').Router()
const {getAllCities,getCity, createCity, updateCity, deleteCity, getAllCitiesByCounty} = require('../../controllers/cityController')

router
    .get('/',getAllCities)
    .post('/',createCity)
    

router
    .get('/:id',getCity)
    .patch('/:id',updateCity)
    .delete('/:id',deleteCity)

router.get('/country/:id',getAllCitiesByCounty)

module.exports = router