const ToVisited = require('../models/PlacesToVisit')
const Visited = require('../models/PlacesVisited')
const ListaEntitati = require('../models/ListaEntitati')
const User = require('../models/User')

const createToVisit = async (req, res) => {
    const {places, username, data} = req.body
    const user = await User.findOne({where: {username: username}})
    
    const toVisit = await ToVisited.create({UserId: user.id, data: data})

    places.forEach(async (place, index) => {
        await ListaEntitati.create({PlaceId: place.id, PlacesToVisitId: toVisit.id, sort: index })
    });

    res.status(201).json({message: "Obiectivul a fost adaugata cu succes in lista"})
}

const deleteToVisit = async (req, res) => {
    const id = req.params.id

    await ToVisited.destroy({where:{id: id}})

    await ListaEntitati.destroy({where: {PlacesToVisitId: id}})

    res.status(200).json({message: "Stergere reusita"})
}

const getAllToVisitByUser = async (req, res) => {
    const username = req.params.id
    const user = await User.findOne({where: {username: username}})
    const userId = user.id

    const toVisit = await ToVisited.findAll({where: {UserId: userId}})

    res.status(200).json(toVisit)
}

const updateList = async (req,res) => {
    const {list, entity} = req.params
    const {username} = req.body
    const user = await User.findOne({where: {username: username}})

    await ListaEntitati.update({done: true}, {where: {PlaceId: entity, PlacesToVisitId: list}})

    const visited = await Visited.create({PlaceId: entity, UserId: user.id})

    res.json({message: 'update reusit', visitedId: visited.id})
}

module.exports = {createToVisit, deleteToVisit, getAllToVisitByUser, updateList}