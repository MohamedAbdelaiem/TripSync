const express = require('express');
const AuthController = require('../Controllers/AuthorizationController');

const ReviewController = require('../Controllers/ReviewController');

const ReviewRouter = express.Router({ mergeParams: true });

ReviewRouter.get('/reviews', AuthController.protect, ReviewController.getAllReviewsOfTravelAgency);

ReviewRouter.post('/reviews/makeReview',AuthController.protect,AuthController.restrictTo('traveller') ,ReviewController.makeReview);

ReviewRouter.delete('/reviews/deleteReview', AuthController.protect,AuthController.restrictTo('admin','traveller') ,ReviewController.deleteReview);







module.exports = ReviewRouter;