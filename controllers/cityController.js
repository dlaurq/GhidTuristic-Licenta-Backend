const City = require('../models/City')
const County = require('../models/County')

const getAllCities = async (req, res) => { 
    const cities = await City.findAll()
    res.status(200).json(cities)
}

const getAllCitiesFromCounty = async (req, res) => { 
    const county = await County.findByPk(req.params.id)
    if(!county) res.status(404).json({message:'Judetul nu a fost gasit'})
    const cities = await county.getCities()
    res.status(200).json(cities)
}

const getCity = async (req, res) => { 
    const city = City.findByPk(req.params.id)
    res.status(200).json(city)
}

const createCity = async (req, res) => { 
    const {name} = req.body
    await City.create({name:name})
    res.status(201).json({message:'Orasul a fost inregistart cu succes'})
}

const updateCity = async (req, res) => { 
    const {name, id} = req.body
    await City.update({name:name}, {where:{id:id}})
    res.status(200).json({message:'Orasul a fost actualizat cu succes'})
}

const deleteCity = async (req, res) => { 
    const {id} = req.body
    await City.destroy({where:{id:id}})
    res.status(200).json({message:'Orasul a fost sters cu succes'})
}


module.exports = {getAllCities, getAllCitiesFromCounty, getCity, createCity, updateCity, deleteCity}