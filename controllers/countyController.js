const Country = require('../models/Country');
const County = require('../models/County');
const Location = require('../models/Location')

const getAllCounties = async (req,res)=>{
    const counties = await County.findAll()
    res.json(counties)
}

const getAllCountiesByCountry = async (req,res)=>{
    const counties = await County.findAll({where:{CountryId:req.countryId}})
    res.json(counties)
}

const getCounty = async (req,res)=>{
    const county = await County.findByPk(req.params.id)
    res.json(county)
}

const createCounty = async (req,res) =>{
    const country = await Country.findByPk(req.countryId)
    if(country !== null){
        const [county, created] = await County.findOrCreate({where: {name:req.body.name, CountryId:req.countryId}})
        if(created) res.json({message:'Judetul a fost inregistrat cu succes.'}) 
        else res.json({message:'Judetul este deja inregistrat.'})
    }else res.json({message:'Tara nu exista.'})
}

const updateCounty = async(req,res)=>{
    const country = await Country.findByPk(req.countryId)
    const county = await County.findByPk(req.body.id)
    if (await country.hasCounty(county)){
        const result = await County.update({name:req.body.name, CountryId:req.body.countryId}, {where:{id:req.body.id, CountryId:req.countryId}})
        if(!!parseInt(result)) res.json({message:'Judetul a fost updatatat cu succes.'})
        else res.json({message:'A aparut o eroare.'})
    }else res.json({message:'Judetul nu apartine tarii.'})
    
}

const deleteCounty = async(req,res)=>{
    const locations = Location.findAll({where:{CountyId:req.body.id}})
    if(locations === null){
        const country = await Country.findByPk(req.countryId)
        const county = await County.findByPk(req.body.id)
        if(await country.hasCounty(county)){
            const result = await County.destroy({where:{id:req.body.id}})
            if(!!parseInt(result)) res.json({message:'Judetul a fost stearsa cu succes.'})
            else res.json({message:'A aparut o eroare.'})
        }else res.json({message:'Judetul nu apartine tarii.'})
    }else res.json({message:"Judetul nu s-a putut sterge deoarece are locatii atribuite."})
    
    
}



module.exports= {getAllCounties, getCounty, createCounty, updateCounty, deleteCounty, getAllCountiesByCountry}