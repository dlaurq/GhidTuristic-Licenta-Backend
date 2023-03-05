const router = require('express').Router()
const {getAllCities, getAllCitiesFromCounty, getCity, createCity, updateCity, deleteCity} = require('../../controllers/cityController')

router.route('/')
    .get(getAllCities)
    .post(createCity)
    .patch(updateCity)
    .delete(deleteCity)

router.route('/:id')
    .get(getCity)
    
router.route('/county/:id')
    .get(getAllCitiesFromCounty)

module.exports = {router}