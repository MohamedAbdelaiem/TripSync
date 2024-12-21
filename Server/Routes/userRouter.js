const express = require("express");
const UserConroller = require("../Controllers/UserConroller");
const AuthConroller = require("../Controllers/AuthorizationController");
const ReviewController = require("../Controllers/ReviewController");
const rewardController = require("../Controllers/RewardsConroller");
const tripController = require("../Controllers/TripController");
const ticketsController = require("../Controllers/TicketController");

//Routes
const QARouter = require("./QARouter");
const reviewRouter = require("./ReviewRouter");
const tripRouter = require("./tripRouter");
const reportRouter = require("./reportRouter");
const ticketRouter = require("./ticketRouter");

const userRouter = express.Router();

//dashboard
userRouter.get("/mostfiveTravellers", AuthConroller.protect, UserConroller.getfivemosttravellers);
userRouter.get("/getAverageRating", AuthConroller.protect, UserConroller.getAvgRatingOfAllTravelAgencies);
// Authentication Routes
userRouter.route("/SignUp").post(AuthConroller.signup);
userRouter.route("/LogIn").post(AuthConroller.LogIn);
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
  .patch(AuthConroller.protect,UserConroller.getMe,UserConroller.UpdateMe);

// Trip-Based routes
userRouter.use(
  "/myProfile/trips",
  AuthConroller.protect,
  AuthConroller.restrictTo("travel_agency"),
  tripRouter
); //->must be edited to handle if the user is traveller

// Report-Based routes
userRouter.use(
  "/:user_id/reports",
  AuthConroller.protect,
  AuthConroller.restrictTo("admin", "traveller"),
  (req, res, next) => {
    reportRouter(req, res, next);
  }
);

//Ticket-Based routes

userRouter.use(
  "/myProfile/tickets",
  AuthConroller.protect,
  AuthConroller.restrictTo("traveller"),
  ticketsController.getAllTickets
);

//Other routers to use apart from the userRouter
userRouter.route('/myProfile/rewards').get(AuthConroller.protect,AuthConroller.restrictTo('traveller'),rewardController.getmyRewards);
userRouter.use('/myProfile/reviews',AuthConroller.protect,AuthConroller.restrictTo('travel_agency'),ReviewController.getAllReviewsOfTravelAgency); 
userRouter.route('/myProfile/Trips',AuthConroller.protect,AuthConroller.restrictTo("traveller"),tripController.getHistory);
userRouter.route('/payForTrip/:trip_id').post(AuthConroller.protect,AuthConroller.restrictTo("traveller"),ticketsController.addTicket);
userRouter.route('/deleteAticket/:trip_id').delete(AuthConroller.protect,AuthConroller.restrictTo("traveller"),ticketsController.deleteTicket);

//Other routers dependent
userRouter.use("/myProfile/QA", QARouter);
userRouter.use("/:user_id/reviews", (req, res, next) => {
  reviewRouter(req, res, next); // Explicitly pass `req` and `res` to reviewRouter
});

//dashBoard
// Export the router
module.exports = userRouter;
