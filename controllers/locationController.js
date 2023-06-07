const Location = require('../models/Location');
const User = require('../models/User');
const Place = require('../models/Place');
const City = require('../models/City')
const Country = require('../models/Country')
const County = require('../models/County')

const getAllLocations = async (req,res)=>{
    const locations = await Location.findAll({include: [
        {
            model: User,
            attributes:['username']
        },
        {
            model: Place,
            attributes:['name']
        },
        {
            model: City,
            attributes:['id', 'name'],
            include: 
                {
                    model: County,
                    attributes:['id', 'name'],
                    include: 
                        {
                            model: Country,
                            attributes:['id', 'name']
                        },
                }
        }    
    ]})
    res.status(200).json(locations)
}

const getAllLocationsByCity = async (req,res)=>{
    const locations = await Location.findAll({where:{CountyId:req.params.id}})
    res.status(200).json(locations)
}

const getLocation = async (req,res)=>{
    const location = await Location.findByPk(req.params.id)
    res.status(200).json(location)
}

const createLocation = async (req,res) =>{
    const city = await City.findByPk(req.body.cityId)
    if(city !== null){
        const [location, created] = await Location.findOrCreate({where: {address:req.body.address, CityId:req.body.cityId}})
        if(created) res.status(201).json({message:'Locatia a fost inregistrat cu succes.', location}) 
        else res.status(409).json({message:'Locatia este deja inregistrat.'})
    }else res.status(404).json({message:'Orasul nu exista.'})
}

const updateLocation = async(req,res)=>{
    const {address, city} = req.body
    const id = req.params.id

    await Location.update({address: address, CityId: city}, {where:{id: id}})
    res.status(200).json({message:'Locatia a fost updatatat cu succes.'})
}

const deleteLocation = async(req,res)=>{
    
    const users = await User.findAll({where:{LocationId:req.params.id}})
    const places = await Place.findAll({where:{LocationId:req.params.id}})
    
    if(users.length !== 0 || places.length !== 0 ) return res.status(405).json({message:"Orasul nu s-a putut sterge deoarece are Utilizatori sau Entitati atribuite."})
    
    await Location.destroy({where:{id:req.params.id}})
    res.status(200).json({message:'Locatia a fost stearsa cu succes.'})
    
}



module.exports= {getAllLocations, getLocation, createLocation, updateLocation, deleteLocation, getAllLocationsByCity}