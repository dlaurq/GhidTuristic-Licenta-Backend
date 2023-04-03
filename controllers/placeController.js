const Place = require('../models/Place')
const Image = require('../models/Image')
const Location = require('../models/Location')
const User = require('../models/User')
const Review = require('../models/Review')

const createPlace = async (req, res) => {
    const {name, description, address, city, username} = req.body

    console.log('aaaaaaa')
    console.log(req.files)

    if(!name || !description || !address || !city) return res.status(400).json({message:"Campuri incomplete"})

    const user = await User.findOne({where:{username: username}})

    const location = await Location.create({CityId: city, address: address})

    const place = await Place.create({name: name, description: description, isActive: false, LocationId: location.id, UserId: user.id})

    const imgs = req.files
    imgs.forEach(async img => {
        const newImg = await Image.create({imgUrl:img.filename, isActive:true, PlaceId:place.id})
        console.log(img.filename)
    });

    res.status(201).json({message: 'Entitatea a fost creata cu succes'})
}

const getPlacesByUser = async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({where:{username: username}})

    
    if(!user) return res.status(404).json({message:'Utilizatorul nu exista'})

    const places = await Place.findAll({
        attributes:['description', 'id', 'isActive', 'name'],
        include:{
            model: Image,
            attributes:['imgUrl']
        },
        where:{UserId: user.id}})

    res.status(200).json(places)
}

const getPlaces = async (req, res) => {
    const places = await Place.findAll({
        attributes:['description', 'id', 'isActive', 'name'],
        include:{
            model: Image,
            attributes:['imgUrl']
        }
    })
    res.status(200).json(places)
}

const getPlace = async (req, res) => {
    const place = await Place.findOne({
        attributes:['description', 'id', 'isActive', 'name'],
        include:[
            {
                model: Image,
                attributes:['imgUrl']
            },
            {
                model: Review,
                attributes:['createdAt', 'description', 'rating', 'title'],
                include:[
                    {
                        model: Image,
                        attributes:['imgUrl']
                    },
                    {
                        model: User,
                        attributes:['username'],
                    },
                ]
            },
        ],
        where:{name: req.params.name}})
    res.status(200).json(place)
}

const deletePlace = async (req, res) => {
    const id = req.params.id

    await Place.destroy({where: {id: id}})

    res.status(200).json({message: "Entitatea a fost stearsa cu succes"})
}

module.exports = {createPlace, getPlacesByUser, getPlaces, getPlace, deletePlace}