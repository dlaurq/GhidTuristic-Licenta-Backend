const Location = require('../models/Location');
const County = require('../models/County');
const City = require('../models/City')

const getAllCities = async (req,res)=>{
    const cities = await City.findAll({include: Location})
    res.status(200).json(cities)
}

const getAllCitiesByCounty = async (req,res)=>{
    const cities = await City.findAll({where:{CountyId:req.params.id}})
    res.status(200).json(cities)
}

const getCity = async (req,res)=>{
    const city = await City.findByPk(req.params.id)
    res.status(200).json(city)
}

const createCity = async (req,res) =>{
    const conty = await County.findByPk(req.body.countyId)
    if(conty !== null){
        const [city, created] = await City.findOrCreate({where: {name:req.body.name, CountyId:req.body.countyId}})
        if(created) res.status(201).json({message:'Orasul a fost inregistrat cu succes.', city}) 
        else res.status(409).json({message:'Orasul este deja inregistrat.'})
    }else res.status(404).json({message:'Judetul nu exista.'})
}

const updateCity = async(req,res)=>{
    await City.update({name:req.body.name, CountyId:req.body.countyId}, {where:{id:req.params.id}})
    res.status(200).json({message:'Orasul a fost updatatat cu succes.'})
}

const deleteCity = async(req,res)=>{
    
    const locations = await Location.findAll({where:{CityId:req.params.id}})
    
    if(locations.length !== 0) return res.status(405).json({message:"Orasul nu s-a putut sterge deoarece are locatii atribuite."})
    console.log('este bun') 
    
    await City.destroy({where:{id:req.params.id}})
    res.status(200).json({message:'Orasul a fost stearsa cu succes.'})
    
}



module.exports= {getAllCities, getCity, createCity, updateCity, deleteCity, getAllCitiesByCounty}