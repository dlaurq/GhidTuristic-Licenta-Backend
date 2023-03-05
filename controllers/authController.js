const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')


const login = async (req,res)=>{

    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({message:'Toate campurile trebuiesc completate'})

    const user = await User.findOne({where: {username:username}})
    if(!user) return res.status(401).json({message:'Neautorizat'})

    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({message:'Neautorizat'})
    
    const accessToken = jwt.sign(
        {
            'UserInfo':{
                'username':user.username,
                'roles':user.getUserRoles
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

    res.cookie('jwt', refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge: 7*24*60*60*1000
    })

    res.json({accessToken})
}

const refresh = (req,res) =>{
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({message:'Neautorizat'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) =>{
            if (err) return res.status(403).json({message:'Interzis'})

            const user = await User.findOne({where: {username:decode.username}})

            if(!user) return res.status(401).json({message:'Neautorizat'})

            const accessToken = jwt.sign(
                {
                    'UserInfo':{
                        'username':user.username,
                        'roles':user.getUserRoles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'10m'}
            )

            res.json({accessToken})
        })
}

const logout = async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
    res.json({message:'Cookie cleared'})
}

//Generate JWT

 
module.exports = {login, logout, refresh}