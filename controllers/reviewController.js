const Review = require('../models/Review')
const Image = require('../models/Image')
const User = require('../models/User')
const Place = require('../models/Place')
const PlaceReviews = require('../models/PlaceReviews')

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
    const id = req.params.id
    const review = await Review.findByPk(id)
    res.json(review)
}

const createReview = async (req,res)=>{
    const reviewData = req.body.review
    const user = await User.findByPk(reviewData.userId)
    const place = await Place.findByPk(reviewData.placeId)
    if(user !== null && place !==null){

        const review = await Review.create({
            title:reviewData.title,
            description:reviewData.description,
            rating:reviewData.rating,
            postDate:reviewData.date
        })

        const placeReview = await PlaceReviews.create({
            UserId:reviewData.userId,
            PlaceId:reviewData.placeId,
            ReviewId:review.id,
        })

        res.json({message:'Review a fost inregistart cu succes.'})

    }else res.json({message:'A aparut o eroare'})
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
    const placeReview = await PlaceReviews.destroy({where:{ReviewId:id}})
    const review = await Review.destroy({where:{id:id}})
    res.json({message:"Delete reusit"})
}


module.exports = {getAllReviews, getAllPlaceReviews, getAllUserReviews, createReview, updateReview, deleteReview}