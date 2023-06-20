const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const roles = [1337, 420]

const login = async (req,res)=>{

    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({message:'Toate campurile trebuiesc completate'})

    const user = await User.findOne({attributes:['id', 'password', 'username', 'refreshToken'], where: {username:username}})
    if(!user) return res.status(401).json({message:'Utilizatorul nu a fost gasit'})

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({message:'Parola incorecta'})
    //'roles':user.getUserRoles
    const accessToken = jwt.sign(
        {
            'UserInfo':{
                'username':user.username,
                'roles':[420]
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'10m'}
    )

    const refreshToken = jwt.sign(
        {
            'username':user.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'7D'}
    )

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('jwt', refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge: 7*24*60*60*1000
    })

    res.json({ roles, accessToken, username: user.username })
}

const refresh = (req,res) =>{
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({message:'Neautorizat'})

    const refreshToken = cookies.jwt

    const foundUser = User.findOne({attributes:['id', 'password', 'username', 'refreshToken'], where:{refreshToken: refreshToken}})
    if(!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) =>{
            if (err) return res.status(403).json({message:'Interzis'})

            const user = await User.findOne({attributes:['id', 'password', 'username', 'refreshToken'], where: {username:decode.username}})

            if(!user) return res.status(401).json({message:'Neautorizat'})

            const accessToken = jwt.sign(
                {
                    'UserInfo':{
                        'username':user.username,
                        'roles':[420]
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'10m'}
            )

            res.json({ roles, accessToken, username: user.username })
        })
}

const logout = async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({attributes:['id', 'password', 'username', 'refreshToken'], where:{refreshToken: refreshToken}})
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
        return res.sendStatus(204)
    }

    foundUser.refreshToken = ''
    await foundUser.save()

    res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
    res.sendStatus(204)
}

const register = async (req,res)=>{

    const {username, password, email} = req.body

    if(!username || !password || !email) return res.status(400).json({message:'Completati toate campurile'})

    const duplicateUsername = await User.findOne({where:{username:username}})
    if(duplicateUsername) return res.status(409).json({message:'Numele de utilizator este deja inregistart'})
    
    const duplicateEmail = await User.findOne({where:{email:email}})
    if(duplicateEmail) return res.status(409).json({message:'Adresa email este deja inregistrata'})

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create(
    {
        username:username,
        password:hashedPassword,
        email:email
    })

    res.status(200).json({message:'Utilizator creat cu succes'})
}

 
module.exports = {login, logout, refresh, register}