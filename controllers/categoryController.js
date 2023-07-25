const Category = require('../models/Category')
const Place = require('../models/Place')

const getAllCategories = async (req, res) => {
    const categories = await Category.findAll({
        include: Place
    })
    res.status(200).json(categories)
} 

const createCategory = async (req, res) => {
    const name = req.body.name

    if(!name) return res.status(404).json({message: 'Camp incomplet'})

    const category = await Category.create({name: name})
    res.status(201).json({message: 'Categoria a fost creata cu succes', category: category})
} 

const updateCategory = async (req, res) => {
    const name = req.body.name
    const id = req.params.id

    if(!name) return res.status(404).json({message: 'Camp incomplet'})

    await Category.update({name: name}, {where: {id: id}})
    res.status(200).json({message: 'Categoria a fost actualizata cu succes'})
}

const deleteCategory = async (req, res) => {
    const id = req.params.id
    const place = await Place.findAll({where: {CategoryId: id}})
    console.log(place)

    if(place.length > 0) return res.status(405).json({message: 'Categoria este atasata unei entitati'})

    await Category.destroy({where: {id: id}})
    res.status(200).json({message: 'Categoria a fost stearsa cu succes'})
} 

module.exports = {getAllCategories, createCategory, updateCategory, deleteCategory}