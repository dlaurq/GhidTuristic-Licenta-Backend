const Place = require('../models/Place')
const Image = require('../models/Image')
const Location = require('../models/Location')
const User = require('../models/user')

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


module.exports = {createPlace}