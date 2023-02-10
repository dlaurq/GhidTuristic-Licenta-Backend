const Users = require('../models/User')

const getAllUsers =  async (req, res) =>{
    const users = await Users.findAll()
    res.json(users)
}

const getUserById = async (req, res) =>{
    const user = await Users.findByPk(req.params.id)
    res.json(user)
}

const createUser = async (req,res)=>{
    const {firstName, lastName, password, email,phoneNr,bio} = req.body.user
    const user = Users.create({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        phoneNr: phoneNr,
        bio: bio
    })
    res.json({message:'Utilizatorul a fost creat'})
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
}