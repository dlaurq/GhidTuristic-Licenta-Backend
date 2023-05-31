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

    //implementare top orase - faci join intre place reviews si orase, si faci max la rating si group by la nume oras

    //Implementare top recomandari - adaugi la plaaces o col type bool care zice daca trb sau nu recomandata si faci cu where

    res.status(200).json({topRest, topActiv, topHotel})
}


module.exports = {getRecomandari}