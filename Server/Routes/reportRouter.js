const express = require("express");
// const TripController = require("../Controllers/TripController");
const reportRouter = express.Router({ mergeParams: true });
const AuthConroller = require("../Controllers/AuthorizationController");
const UserConroller = require("../Controllers/UserConroller");
const ReportController = require("../Controllers/ReportController");

reportRouter
  .route("/getAllReports")
  .get(
    AuthConroller.protect,
    AuthConroller.restrictTo("travel_agency"),
    ReportController.getAllReports
  );

reportRouter
  .route("/addReport")
  .post(
    AuthConroller.protect,
    AuthConroller.restrictTo("traveller"),
    ReportController.addReport
  );

reportRouter
  .route("/deleteReport")
  .delete(
    AuthConroller.protect,
    AuthConroller.restrictTo("traveller", "admin"),
    ReportController.deleteReport
  );

module.exports = reportRouter;
