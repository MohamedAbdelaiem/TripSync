const express = require("express");
const TripController = require("../Controllers/TripController");
const tripRouter = express.Router();
const AuthConroller = require("../Controllers/AuthorizationController");
const UserConroller = require("../Controllers/UserConroller");

console.log("[");
console.log(TripController.getAllTrips); // Should not log `undefined`
console.log("]");

tripRouter
  .route("/getAllTrips")
  .get(AuthConroller.protect, TripController.getAllTrips);

tripRouter
  .route("/getTripByID/:trip_id")
  .get(AuthConroller.protect, TripController.getTripById);

tripRouter
  .route("/deleteTrip/:trip_id")
  .delete(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.deleteTrip
  );
// tripRouter.route('/addTrip').post(AuthConroller.protect,TripController.addTrip);

tripRouter
  .route("/addTrip")
  .post(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.addTrip
  );

tripRouter
  .route("/updateTrip/:Trip_id")
  .patch(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.updateTrip
  );

tripRouter
  .route("/getHistory")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("traveller"),
    TripController.getHistory
  );

tripRouter
  .route("/promoteTrip/:Trip_ID")
  .post(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.PromoteTrip
  );

tripRouter
  .route("/getAllPromotions")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.getAllPromotions
  );

tripRouter
  .route("/deletePromotion/:Trip_ID")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    TripController.deletePromotion
  );

module.exports = tripRouter;
