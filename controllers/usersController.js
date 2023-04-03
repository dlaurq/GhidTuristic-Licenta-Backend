const Users = require('../models/User')
const Roles = require('../models/Role')
const Reviews = require('../models/Review')
const Places = require('../models/Place')
const Images = require('../models/Image')
const bcrypt = require('bcrypt')

const getAllUsers =  async (req, res) =>{
    console.log('YES')
    const users = await Users.findAll({
        attributes:['firstName', 'lastName', 'username', 'email', 'phoneNR', 'bio'],
        include:[
            {
                model: Roles,
                attributes: ['name'],
                
            },
            {
                model: Reviews,
                attributes:['id', 'createdAt', 'description', 'rating', 'title'],
                include:[
                    {
                        model: Images,
                        attributes:['imgUrl']
                    },
                    {
                        model: Users,
                        attributes:['username'],
                    },
                ]
            },
            {
                model: Places,
                attributes:['name', 'description'],
                include:[
                    {
                        model: Images,
                        attributes:['imgUrl']
                    }
                ]
            },
            {
                model: Images,
                attributes:['imgUrl']
            }
        ]
    })
    res.status(200).json(users)
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

const deleteUser = async (req,res) =>{
    const username = req.params.username
    await Users.destroy({where: {username: username}})
    res.status(200).json({message: "Utilizatorul a fost sters cu succes"})
}

const promoteUserToPartner = async (req, res) => {
    const {username} = req.body

    if(!username) return res.status(404).json({message: "Utilizatorul nu exista"})

    const user = await Users.findOne({where: {username: username}})

    const role = await Roles.findOne({where: {
        UserId: user.id,
        name: 1337
    }})
    console.log(role)
    if(!role) await Roles.create({name: 1337, UserId: user.id})
    else await role.destroy()

    res.sendStatus(200)
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    promoteUserToPartner
}