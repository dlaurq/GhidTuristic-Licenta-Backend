const ToVisited = require('../models/PlacesToVisit')
const ListaEntitati = require('../models/ListaEntitati')
const User = require('../models/User')

const createToVisit = async (req, res) => {
    const {places, username, data} = req.body
    const user = await User.findOne({where: {username: username}})
    
    const toVisit = await ToVisited.create({UserId: user.id})

    places.forEach(async (place) => {
        await ListaEntitati.create({PlaceId: place.id, PlacesToVisitId: toVisit.id, data: data})
    });

    res.status(201).json({message: "Obiectivul a fost adaugata cu succes in lista"})
}

const deleteToVisit = async (req, res) => {
    const id = req.params.id

    await ToVisited.destroy({where:{id: id}})

    res.status(200).json({message: "Stergere reusita"})
}

const getAllToVisitByUser = async (req, res) => {
    const username = req.params.id
    const user = await User.findOne({where: {username: username}})
    const userId = user.id

    const toVisit = await ToVisited.findAll({where: {UserId: userId}})

    res.status(200).json(toVisit)
}



module.exports = {createToVisit, deleteToVisit, getAllToVisitByUser}