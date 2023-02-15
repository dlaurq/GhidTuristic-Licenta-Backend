const router = require('express').Router()
const {getAllReviews, getAllPlaceReviews, getAllUserReviews, createReview, updateReview, deleteReview} = require('../../controllers/reviewController')

router.get('/', getAllReviews)
router.get('/user/:id', getAllUserReviews)
router.get('/place/:id', getAllPlaceReviews)
router.post('/', createReview)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)


module.exports = router 