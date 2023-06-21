const Places = require('../models/Place')
const Reviews = require('../models/Review')
const Categories = require('../models/Category')
const Image = require('../models/Image')

const getRecomandari = async (req, res) => { 

    const topRest = await Places.findAll({
        include: [
            {
                model: Reviews,
                required: true,
            },
            {
                model: Categories,
                required: true,
                where:{
                    name: 'Restaurant'
                },
            },
            {
                model: Image,
                attributes:['imgUrl']
            },
        ],
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
                name: 'Hotel'
            }
        },
        {
            model: Image,
            attributes:['imgUrl']
        },],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })

    const topTrasee = await Places.findAll({
        include: [{
        model: Reviews,
        required: true,
        },{
            model: Categories,
            required: true,
            where:{
                name: 'Trasee Montane'
            }
        },
        {
            model: Image,
            attributes:['imgUrl']
        },],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })

    const topActivitati = await Places.findAll({
        include: [{
        model: Reviews,
        required: true,
        },{
            model: Categories,
            required: true,
            where:{
                name: 'Activitate'
            }
        },
        {
            model: Image,
            attributes:['imgUrl']
        },],
        order:[['Reviews','rating', 'DESC']],
        limit: 10
    })
    /** 
    const topRecomandari = await Places.findAll({
        attributes: ['id', 'name', [sequelize.fn('AVG', sequelize.col('Reviews.rating')), 'average_rating']],
        include: [
          {
            model: Reviews,
          },
          {
            model: Categories,
            required: true,
          },
          {
            model: Image,
            attributes: ['imgUrl'],
          },
        ],
        group: ['Place.id', 'Images.id'],
        order: [[sequelize.literal('average_rating'), 'DESC']],
      });
    */

    res.status(200).json({topRest, topTrasee, topHotel, topActivitati})
   
}

//attributes: [[Sequelize.fn('AVG', Sequelize.col('Reviews.rating')), 'rating']],
//order:[['AVG', 'DESC']],
module.exports = {getRecomandari}