const Users = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers =  async (req, res) =>{
    const users = await Users.findAll()
    res.json(users)
}

const getUserById = async (req, res) =>{
    const user = await Users.findByPk(req.params.id)
    res.json(user)
}

const createUser = async (req,res)=>{
    const {username, password, email,} = req.body
    console.log(username, password, email)
    if(!username || !password || !email) return res.status(400).json({message:'Completati toate campurile'})

    const duplicateUsername = await Users.findOne({where:{username:username}})
    if(duplicateUsername) return res.status(409).json({message:'Username existent'})
    
    const duplicateEmail = await Users.findOne({where:{email:email}})
    if(duplicateEmail) return res.status(409).json({message:'Email existent'})

    const hashedPassword = await bcrypt.hash(password, 10)

    await Users.create(
    {
        username:username,
        password:hashedPassword,
        email:email
    })

    res.status(200).json({message:'Utilizator creat cu succes'})
}

const updateUser = async (req,res) =>{
    
}

const deleteUser = async(req,res) =>{

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}