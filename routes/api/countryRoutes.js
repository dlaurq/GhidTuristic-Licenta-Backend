const router = require('express').Router()
const {router:countyRoutes} = require('./countyRoutes')

const {getAllCountries, getCountry, createCountry, updateCountry, deleteCountry} = require('../../controllers/countryController')


router
    .get('/',getAllCountries)
    .post('/',createCountry)

router
    .get('/:id',getCountry)
    .patch('/:id',updateCountry)
    .delete('/:id',deleteCountry)


/*
router.use('/:id/counties',(req,res,next)=>{
    req.countryId = req.params.id
    next()
},countyRoutes)
*/
module.exports = router