const Category = require('../models/Category')

const getAllCategories = async (req, res) => {
    const categories = await Category.findAll()
    res.status(200).json(categories)
} 

const createCategory = async (req, res) => {
    const name = req.body.name

    if(!name) return res.status(404).json({message: 'Camp incomplet'})

    const category = await Category.create({name: name})
    res.status(201).json({message: 'Categoria a fost creata cu succes', category: category})
} 

const updateCategory = async (req, res) => {
    const name = req.body
    const id = req.params.id

    if(!name) return res.status(404).json({message: 'Camp incomplet'})

    await Category.update({name: name}, {where: {id: id}})
    res.status(200).json({message: 'Categoria a fost actualizata cu succes'})
}

const deleteCategory = async (req, res) => {
    const id = req.params.id

    await Category.destroy({where: {id: id}})
    res.status(200).json({message: 'Categoria a fost stearsa cu succes'})
} 

module.exports = {getAllCategories, createCategory, updateCategory, deleteCategory}