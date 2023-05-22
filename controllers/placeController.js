const Place = require('../models/Place')
const Image = require('../models/Image')
const Location = require('../models/Location')
const User = require('../models/User')
const Review = require('../models/Review')
const Country = require('../models/Country')
const County = require('../models/County')
const City = require('../models/City')
const Category = require('../models/Category')
const fs = require('fs')

const createPlace = async (req, res) => {
    const {name, description, address, city, username, category} = req.body

    console.log('category = ' + category)
    console.log('aaaaaaa')
    console.log(req.files)

    if(!name || !description || !address || !city || !category) return res.status(400).json({message:"Campuri incomplete"})

    const user = await User.findOne({where:{username: username}})

    const location = await Location.create({CityId: city, address: address})

    const place = await Place.create({name: name, description: description, isActive: false, LocationId: location.id, UserId: user.id, CategoryId: category})

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
        include:[
            {
                model: Image,
                attributes:['imgUrl']
            },
            {
                model: Category,
            },
            {
                model: Location,
                attributes:['id', 'address'],
                include: 
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
            }
            
        ],
        where:{UserId: user.id}})

    res.status(200).json(places)
}

const getPlaces = async (req, res) => {
    const places = await Place.findAll({
        attributes:['description', 'id', 'isActive', 'name'],
        include:[
            {
            model: Image,
            attributes:['imgUrl']
            },
            {
                model: Category,
                attributes:['id']
            }
        ]
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
                model: Category,
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

const updatePlace = async (req, res) => {
    //console.log(req.params.id)
    const id = req.params.id
    const newImgs = req.files
    const {name, description, country, county, city, address, extImgs, category} = req.body


    //console.log('\n')
    //console.log(extImgs)
    //console.log('\n')

    if(!name || !description || !address || !city || !category) return res.status(400).json({message:"Campuri incomplete"})
    
    //console.log(extImgs)
    if(extImgs){
        
        console.log('\n')
        const saveImgs = JSON.parse(extImgs)
        console.log("save img: ")
        console.log(saveImgs)
        const imgs = await Image.findAll({attributes:['imgUrl'], where: {PlaceId: id}, raw: true})
        const delImgs = imgs.filter(img => !saveImgs.find( img2 => img.imgUrl == img2.imgUrl))
        console.log("all img: ")
        console.log(imgs)
        console.log("DELETE")
        console.log(delImgs)
        console.log('\n')

        delImgs.forEach(img => {
            fs.unlink('uploads/' + img.imgUrl, async (err) => {
                if (err) {
                    res.status(500).send({
                    message: "Could not delete the file. " + err,
                    });
                }
                await Image.destroy({where: {imgUrl: img.imgUrl}})
            })
        })
        
    }

    const oldPlace = await Place.findByPk(id)
    //console.log(oldPlace)
    const oldLocationId = oldPlace.LocationId 
    const oldLocation = await Location.findOne({where: {id: oldLocationId}})

    const newLocation = await Location.create({CityId: city, address: address})

    const place = await Place.update(
        {name: name, description: description, isActive: false, LocationId: newLocation.id, CategoryId: category},
        {where: {id: id}})

    


    newImgs.forEach(async img => {
        await Image.create({imgUrl: img.filename, isActive: true, PlaceId: id})
    })

    await oldLocation.destroy()

    res.status(201).json({message: "Entitatea a fost actualizata cu succes", entity: place})

}

module.exports = {createPlace, getPlacesByUser, getPlaces, getPlace, deletePlace, updatePlace}