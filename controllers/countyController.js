const Country = require('../models/Country');
const County = require('../models/County');
const City = require('../models/City')

const getAllCounties = async (req,res)=>{
    const counties = await County.findAll({include: City})
    res.status(200).json(counties)
}

const getAllCountiesByCountry = async (req,res)=>{
    const counties = await County.findAll({where:{CountryId:req.params.id}})
    res.status(200).json(counties)
}

const getCounty = async (req,res)=>{
    const county = await County.findByPk(req.params.id)
    res.status(200).json(county)
}

const createCounty = async (req,res) =>{
    const country = await Country.findByPk(req.body.countryId)
    if(country !== null){
        const [county, created] = await County.findOrCreate({where: {name:req.body.name, CountryId:req.body.countryId}})
        if(created) res.status(201).json({message:'Judetul a fost inregistrat cu succes.', county}) 
        else res.status(409).json({message:'Judetul este deja inregistrat.'})
    }else res.status(404).json({message:'Tara nu exista.'})
}

const updateCounty = async(req,res)=>{
    await County.update({name:req.body.name, CountryId:req.body.countryId}, {where:{id:req.params.id}})
    res.status(200).json({message:'Judetul a fost updatatat cu succes.'})
}

const deleteCounty = async(req,res)=>{
    console.log(req.params.id)
    
    const cities = await City.findAll({where:{CountyId:req.params.id}})
    console.log(cities.length)
    
    if(cities.length !== 0) return res.status(405).json({message:"Judetul nu s-a putut sterge deoarece are orase atribuite."})
    console.log('este bun') 
    
    await County.destroy({where:{id:req.params.id}})
    res.status(200).json({message:'Judetul a fost stearsa cu succes.'})
    
}



module.exports= {getAllCounties, getCounty, createCounty, updateCounty, deleteCounty, getAllCountiesByCountry}