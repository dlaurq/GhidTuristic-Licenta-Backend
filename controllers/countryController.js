const Country = require('../models/Country')
const County = require('../models/County')

const getAllCountries = async (req,res)=>{
    const countries = await Country.findAll({include: County})
    res.status(200).json(countries)
}

const getCountry = async (req,res)=>{
    const country = await Country.findByPk(req.params.id)
    res.status(200).json(country)
}

const createCountry = async (req,res) =>{
    const [country, created] = await Country.findOrCreate({where: {name:req.body.name}})
    if(!created) return res.status(409).json({message:'Tara este deja inregistrata.'})
    res.status(201).json({country ,message:'Tara a fost inregistrata cu succes.'})
}

const updateCountry = async(req,res)=>{
    await Country.update({name:req.body.name}, {where:{id:req.params.id}})
    res.status(200).json({message:'Tara a fost updatatat cu succes.'})
}

const deleteCountry = async(req,res)=>{
    const country = await Country.findByPk(req.params.id)
    const counties = await country.countCounties()

    if(counties !== 0) return res.status(405).json({message:"Tara nu s-a putut sterge deoarece are judete atribuite."})

    await Country.destroy({where:{id:req.params.id}})
    res.status(200).json({message:'Tara a fost stearsa cu succes.'})
}



module.exports= {getAllCountries, getCountry, createCountry, updateCountry, deleteCountry}