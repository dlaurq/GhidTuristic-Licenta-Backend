const Location = require('../models/Location')
const City = require('../models/City')
const User = require('../models/User')
const Place = require('../models/Place')


const getAllLocations = async (req,res) => {
    const locations = await Location.findAll()
    res.status(200).json(locations)
}

const getAllLocationsFromCity = async (req,res) => {
    const locations = await Location.findByPk(req.body.id)
    res.status(200).json(locations)
}

const getLocation = async (req,res) => {
    const location = await Location.findAll({where:{id:req.body.id}})
    res.status(200).json(location)
}

const createLocation = async (req,res) => {
    const { cityId, address, geoLocation} = req.body
    const city = await City.findByPk(cityId)

    if(!city) res.status(404).json({message:'Orasul nu exista'})

    const location = await Location.create({address:address, geoLocation:geoLocation})

    await city.addLocation(location)
    res.status(201).json({message:'Locatie creata cu succes'})
}

const updateLocation = async (req,res) => {
    const {address, geoLocation, id} = req.body

    await Location.update({address:address, geoLocation:geoLocation}, {where:{id:id}})

    res.status(200).json({message:'Locatie actualizata cu succes'})
}

const deleteLocation = async (req,res) => {
    const {id} = req.body
    const places = await Place.findAll({where:{locationId:id}})
    const users = await User.findAll({where:{locationId:id}})

    if(places || users) res.status(409).json({message:'Stergere esuata. Locatia este atribuita.'})

    await Location.destroy({where:{id:id}})
}
