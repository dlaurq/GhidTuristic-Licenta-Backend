const Country = require('../models/Country')
const County = require('../models/County')
const City = require('../models/City')


const getGeo = async (req, res) => {
    const countries = await Country.findAll()
    const counties = await County.findAll()
    const cities = await City.findAll()

    res.status(200).json({countries, counties, cities})
}


module.exports = {getGeo}