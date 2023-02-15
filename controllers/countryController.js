const Country = require('../models/Contry')
const County = require('../models/County')

const getAllCountries = async (req,res)=>{
    const countries = await Country.findAll()
    res.json(countries)
}

const getCountry = async (req,res)=>{
    const country = await Country.findByPk(req.params.id)
    res.json(country)
}

const createCountry = async (req,res) =>{
    const [country, created] = await Country.findOrCreate({where: {name:req.body.name}})
    if(created) res.json({message:'Tara a fost inregistrata cu succes.'})
    else res.json({message:'Tara este deja inregistrata.'})
}

const updateCountry = async(req,res)=>{
    const result = await Country.update({name:req.body.name}, {where:{id:req.body.id}})
    if(!!parseInt(result)) res.json({message:'Tara a fost updatatat cu succes.'})
    else res.json({message:'A aparut o eroare'})
}

const deleteCountry = async(req,res)=>{
    const counties = County.findAll({where:{CountryId:req.body.id}})
    if(counties === null){
        const result = await Country.destroy({where:{id:req.body.id}})
        if(!!parseInt(result)) res.json({message:'Tara a fost stearsa cu succes.'})
        else res.json({message:'A aparut o eroare'})
    }else res.json({message:"Tara nu s-a putut sterge deoarece are judete atribuite."})
    
}



module.exports= {getAllCountries, getCountry, createCountry, updateCountry, deleteCountry}