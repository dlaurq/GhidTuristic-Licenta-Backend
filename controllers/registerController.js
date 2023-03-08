const User = require('../models/User')
const bcrypt = require('bcrypt')

const createNewUser = async (req,res) => {
    const {username, password, email} = req.body

    if(!username || !password || !email) return res.status(400).json({message: 'Campurile nu sunt completate'})

    const duplicate1 = await User.findOne({where:{username:username}})
    if(duplicate1) return res.status(409).json({message: 'Numele de utilizator exista deja'})

    const duplicate2 = await User.findOne({where:{email:email}})
    if(duplicate2) return res.status(409).json({message: 'Email-ul exista deja'})

    try{
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await User.create({
            username:username, 
            password:hashedPassword,
            email:email,
            isActive:true
        })

        res.status(201).json({message:'Inregistrare reusita'})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {createNewUser}