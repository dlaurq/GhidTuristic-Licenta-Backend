const router = require('express').Router()
const {getAllLocations, getLocation, createLocation, updateLocation, deleteLocation, getAllLocationsByCity} = require('../../controllers/locationController')

router
    .get('/',getAllLocations)
    .post('/',createLocation)
    

router
    .get('/:id',getLocation)
    .patch('/:id',updateLocation)
    .delete('/:id',deleteLocation)

router.get('/country/:id',getAllLocationsByCity)

module.exports = router