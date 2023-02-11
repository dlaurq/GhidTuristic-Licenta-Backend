const router = require('express').Router()
const {router:countyRoutes} = require('./countyRoutes')

const {getAllCountries, getCountry, createCountry, updateCountry, deleteCountry} = require('../../controllers/countryController')

router.get('/',getAllCountries)
router.get('/:id',getCountry)
router.post('/',createCountry)
router.patch('/',updateCountry)
router.delete('/',deleteCountry)

router.use('/:id/counties',(req,res,next)=>{
    req.countryId = req.params.id
    next()
},countyRoutes)

module.exports = router