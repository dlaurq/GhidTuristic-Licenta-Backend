const Places = require('../models/Place')
const Reviews = require('../models/Review')
const Categories = require('../models/Category')

const getRecomandari = async (req, res) => { 

    const topRest = await Places.findAll({
        include: [{
            model: Reviews,
            required: true,
        },{
            model: Categories,
            required: true,
            where:{
                name: 'Restaurant'
            }
        }],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })
    

    const topHotel = await Places.findAll({
        include: [{
        model: Reviews,
        required: true,
        },{
            model: Categories,
            required: true,
            where:{
                name: 'hotel'
            }
        }],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })

    const topActiv = await Places.findAll({
        include: [{
        model: Reviews,
        required: true,
        },{
            model: Categories,
            required: true,
            where:{
                name: 'activitate'
            }
        }],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })

    res.status(200).json({topRest, topActiv, topHotel})
}


module.exports = {getRecomandari}