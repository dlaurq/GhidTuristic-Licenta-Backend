const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startWith('Bearer ')){
        return res.status(401).json({message:'Neautorizat'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) =>{
            if (err) return res.status(403).json({message:'Interzis'})
            req.user = decode.UserInfo.username
            req.roles = decode.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT