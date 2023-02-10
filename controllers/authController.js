const validator = require('validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')


//autentificare
const signin = async (req,res)=>{
    const {username, password} = req.body.user

    const user = await User.findOne({where: {username:username}})
    if(user !== null){
        const validPW = await bcrypt.compare(password, user.password)

        if(validPW) res.json({message:'Autentificare reusita'})
        else res.json({message:'Parola incorecta'})
    }
    else res.json({message:'Username Incorect'})
}

//register
const signup = async (req,res)=>{
    const user = req.body.user
    const username = await User.findOne({where: {username:user.username}})
    const email = await User.findOne({where: {email:user.email}})

    if(username !== null) res.json({message:"Username existent"})
    if(email !== null) res.json({message:"Email existent"})
    if(!isValidEmail(user.email) || !isValidPass(user.password) || !isValidUsername(user.username)) res.json({message:"Date incorecte"})

    const password = user.password
    const saltRounds=10;
    bcrypt.hash(password, saltRounds, async (err, hash) =>{
        const newUser = await User.create({
            username:user.username,
            password:hash,
            email:user.email
        })
    })
    
    res.json({message:"Cont inregistrat"})
}

const signout = async (req,res)=>{
    
}

function isValidEmail(email){
    return validator.isEmail(email)
}

function isValidUsername(username){
    return (validator.isLength(username,{min:4,max:16}) && validator.isAlphanumeric(username))
}

function isValidPass(pass){
    return validator.isStrongPassword(pass)
}

module.exports = {signin, signout, signup}