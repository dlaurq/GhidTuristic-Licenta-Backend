const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5,
    message:{
        message: 'Prea multe incercari de autentificare, incercati peste 60 de secunde'
    },
    handler:(req,res,next,options) =>{
        res.status(options.statusCode).send(options.messa)
    },
    standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders:false,// Disable the 'X-rateLimit-*' headerts
})

module.exports = loginLimiter