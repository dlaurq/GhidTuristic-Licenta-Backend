const Visited = require('../models/PlacesVisited')
const User = require('../models/User')

const createVisited = async (req, res) => {
    const {place, username} = req.body
    const user = await User.findOne({where: {username: username}})
    const userId = user.id

    await Visited.create({PlaceId: place, UserId: userId})

    res.status(201).json({message: "Obiectivul a fost adaugata cu succes in lista"})
}

const deleteVisited = async (req, res) => {
    const id = req.params.id

    await Visited.destroy({where:{id: id}})

    res.status(200).json({message: "Stergere reusita"})
}

const getAllVisitedByUser = async (req, res) => {
    const username = req.params.id
    const user = await User.findOne({where: {username: username}})
    const userId = user.id

    const visited = await Visited.findAll({where: {UserId: userId}})

    res.status(200).json(visited)
}

module.exports = {createVisited, deleteVisited, getAllVisitedByUser}