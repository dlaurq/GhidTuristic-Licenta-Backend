const ToVisited = require('../models/PlacesToVisit')
const User = require('../models/User')

const createToVisit = async (req, res) => {
    const {place, username} = req.body
    const user = await User.findOne({where: {username: username}})
    const userId = user.id

    await ToVisited.create({PlaceId: place, UserId: userId})

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