const Roles = require('../models/Role')
const Reviews = require('../models/Review')
const Places = require('../models/Place')
const Images = require('../models/Image')
const bcrypt = require('bcrypt')
const PlacesToVisit = require('../models/PlacesToVisit')
const PlacesVisited = require('../models/PlacesVisited')
const Users = require('../models/User')
const Categorys = require('../models/Category')
const ListaEntitati = require('../models/ListaEntitati')

const getAllUsers =  async (req, res) =>{
    console.log('YES')
    const users = await Users.findAll({
        attributes:['firstName', 'lastName', 'username', 'email', 'phoneNr', 'bio'],
        include:[
            {
                model: Roles,
                attributes: ['name'],
            },
            {
                model: Places,
                attributes:['description', 'id', 'isActive', 'name'],
                as: 'Entities',
                include:[
                    {
                        model: Images,
                        attributes:['imgUrl']
                    },
                    {
                        model: Categorys,
                        attributes:['name']
                    },
                    {
                        model: Reviews,
                        attributes:['rating']
                    }
                ]
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
                model: Images,
                attributes:['imgUrl']
            }
        ]
    })
    res.status(200).json(users)
}

const getUser = async (req, res) =>{
    const user = await Users.findOne({
        where: {username: req.params.username},
        attributes: ['username', 'firstName', 'lastName', 'email', 'phoneNr', 'bio'],
        include: [
            {
                model: Reviews,
                attributes:['id' ,'createdAt', 'description', 'rating', 'title'],
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
                model: PlacesToVisit,
                include:{
                    model: Places,
                    through:{
                        attributes: ['done', 'sort'],
                      },
                    include:[
                        {
                            model: Images,
                            attributes:['imgUrl']
                        },
                        {
                            model: Categorys,
                            attributes:['id', 'name']
                        },
                        {
                            model: Reviews,
                            attributes:['rating']
                        },
                    ],
                    
                },
                
                
            },
            {
                model: Places,
                as:'PlacesVisited2',
                through: {
                    attributes: ['id']
                },
                include:[
                    {
                        model: Images,
                        attributes:['imgUrl']
                    },
                    {
                        model: Categorys,
                    },
                    {
                        model: Reviews,
                        attributes:['rating']
                    }
                ],
            }

        ]
    })

    res.status(200).json(user)
}

const createUser = async (req,res)=>{
    const {username, password, email} = req.body

    if(!username || !password || !email) return res.status(400).json({message:'Completati toate campurile'})

    const duplicateUsername = await Users.findOne({where:{username:username}})
    if(duplicateUsername) return res.status(409).json({message:'Numele de utilizator este deja inregistart'})
    
    const duplicateEmail = await Users.findOne({where:{email:email}})
    if(duplicateEmail) return res.status(409).json({message:'Adresa email este deja inregistrata'})

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
    const {firstName, lastName, email, bio, phoneNr} = req.body
    const username = req.params.username
    await Users.update({firstName: firstName, lastName: lastName, email: email, bio: bio, phoneNr: phoneNr}, {where: {username}}) 
    res.status(200).json({message: 'Actualizare reusita'})
}

const deleteUser = async (req,res) =>{
    const username = req.params.username

    const user = await Users.findOne({where: {username: username}})

    const places = await Places.findAll({where:{UserId: user.id}})
    const reviews = await Reviews.findAll({where:{UserId: user.id}})

    if(places.length > 0) return res.status(405).json({message: 'Utilizatorul are atasate entitati'})
    if(reviews.length > 0) return res.status(405).json({message: 'Utilizatorul are atasate recenzii'})

    await Users.destroy({where: {username: username}})
    res.status(200).json({message: "Utilizatorul a fost sters cu succes"})
}

const promoteUserToPartner = async (req, res) => {
    console.log('promoted')
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

const changePw = async (req, res) => {
    const pw = req.body.pw
    const username = req.params.username
    console.log(pw, username)

    const hashedPassword = await bcrypt.hash(pw, 10)

    await Users.update({password: hashedPassword},  {where: {username}})

    console.log('asd')
    res.status(200).json({message: 'Update reusit'})
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    promoteUserToPartner,
    changePw
}