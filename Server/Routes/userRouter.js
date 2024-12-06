
const express = require('express');
const UserConroller = require('../Controllers/UserConroller');
const AuthConroller = require('../Controllers/AuthorizationController');
const ReviewController = require('../Controllers/ReviewController');
const rewardController = require('../Controllers/RewardsConroller');

//Routes
const QARouter=require('./QARouter');
const reviewRouter=require('./ReviewRouter');
const tripRouter = require("./tripRouter");
const reportRouter = require("./reportRouter");
const ticketRouter = require("./ticketRouter");

const userRouter = express.Router();

// Authentication Routes
userRouter.route("/SignUp").post(AuthConroller.signup);
userRouter.route("/Login").post(AuthConroller.LogIn);
userRouter.route("/Logout").post(AuthConroller.LogOut); // Changed to POST
userRouter.route("/ForgotPassword").post(AuthConroller.forgotPassword);
userRouter
  .route("/ResetPassword/:resetToken")
  .patch(AuthConroller.resetPassword);

// Admin-protected routes

userRouter
  .route("/getAllUsers")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("admin"),
    UserConroller.getAllUsers
  );

userRouter
  .route("/getAllAdmins")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("admin"),
    UserConroller.getAllAdmins
  );

userRouter
  .route("/createUser")
  .post(
    AuthConroller.protect,
    AuthConroller.restrictTo("admin"),
    UserConroller.createUser
  );

userRouter
  .route("/deleteUser")
  .delete(
    AuthConroller.protect,
    AuthConroller.restrictTo("admin"),
    UserConroller.DeleteUser
  );

// General routes
userRouter
  .route("/myProfile")
  .get(AuthConroller.protect, UserConroller.getMe, UserConroller.getUser);
userRouter
  .route("/getAllTravelAgencies")
  .get(AuthConroller.protect, UserConroller.getAllTravelAgencies);
userRouter
  .route("/getAllTravelers")
  .get(AuthConroller.protect, UserConroller.getAllTravelers);
userRouter.route("/:user_id").get(AuthConroller.protect, UserConroller.getUser);
userRouter
  .route("/DeleteME")
  .delete(AuthConroller.protect, UserConroller.getMe, UserConroller.DeleteMe);
userRouter
  .route("/updateMe")
  .patch(AuthConroller.protect, UserConroller.getMe, UserConroller.UpdateMe);

// Trip-Based routes
userRouter.use("/myProfile/trips", tripRouter);

// Report-Based routes
userRouter.use("/:user_id/reports", (req, res, next) => {
  reportRouter(req, res, next);
});

//Ticket-Based routes
userRouter.use("/myProfile/tickets", ticketRouter);


//Other routers to use apart from the userRouter
userRouter.route('/myProfile/rewards').get(AuthConroller.protect,AuthConroller.restrictTo('traveller'),rewardController.getmyRewards);
userRouter.use('/myProfile/reviews',AuthConroller.protect,AuthConroller.restrictTo('travel_agency'),ReviewController.getAllReviewsOfTravelAgency); 

//Other routers dependent
userRouter.use('/myProfile/QA',QARouter);
userRouter.use('/:user_id/reviews', (req, res, next) => {
  reviewRouter(req, res, next); // Explicitly pass `req` and `res` to reviewRouter
});




// Export the router
module.exports = userRouter;
