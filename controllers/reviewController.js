const Review = require('../models/Review')
const Image = require('../models/Image')
const User = require('../models/User')
const Place = require('../models/Place')

const getAllReviews = async (req,res)=>{
    const reviews = await Review.findAll()
    res.json(reviews)
}

const getAllUserReviews = async (req,res)=>{
    const userId = req.params.id
    const reviews = await Review.findAll({include:{model:PlaceReviews,where:{UserId:userId}}})
    res.json(reviews)
}

const getAllPlaceReviews = async (req,res)=>{
    const placeId = req.params.id
    const reviews = await Review.findAll({include:{model:PlaceReviews,where:{PlaceId:placeId}}})
    res.json(reviews)
}

const getReviewById = async (req,res)=>{
    const review = await Review.findByPk(req.params.id, 
        {
            attributes: ['title', 'createdAt', 'rating', 'description'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Image,
                    attributes: ['imgUrl']
                }
            ]
        })
    res.json(review)
}

const createReview = async (req,res)=>{
    console.log('sal')
    const {title, description, rating, username, entityName} = req.body
    console.log(entityName)
    const user = await User.findOne({attributes:['id'], where:{username: username}})
    const place = await Place.findOne({attributes:['id'], where:{name: entityName}})

    if( !title || !rating ) return res.status(400).json({message:'Campuri incomplete'})
    if(!user || !place) return res.status(404).json({message:'Utilizatorul sau entitatea nu exista'})

    const review = await Review.create({
        title: title,
        description: description,
        rating: rating,
        isActive: true,
        UserId: user.id,
        PlaceId: place.id
    })

    const imgs = req.files
    imgs.forEach(async img => {
        const newImg = await Image.create({imgUrl:img.filename, isActive:true, ReviewId:review.id})
        console.log(img.filename)
    });

    res.status(200).json({message:'Review a fost inregistart cu succes.'})

    
}

const updateReview = async (req,res)=>{
    const id = req.params.id
    const reviewData = req.body.review
    const review = await Review.update({
        title:reviewData.title,
        description:reviewData.description,
        rating:reviewData.rating,
        postDate:reviewData.date
    },{where:{id:id}})
    res.json({message:"Update reusit"})
}
const deleteReview = async (req,res)=>{
    const id = req.params.id
    console.log(id)
    await Review.destroy({where: {id: id}})
    res.status(200).json({message: "Stergere reusita"})
}


module.exports = {getAllReviews, getAllPlaceReviews, getAllUserReviews, createReview, updateReview, deleteReview}