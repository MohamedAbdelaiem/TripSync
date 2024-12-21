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
    AuthConroller.restrictTo("admin"),
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
    AuthConroller.restrictTo("admin"),
    ReportController.deleteReport
  );

reportRouter
  .route("/deleteReportForAdmin")
  .delete(
    AuthConroller.protect,
    AuthConroller.restrictTo("admin"),
    ReportController.deleteReportForAdmin
);  

//dashboard
reportRouter
.route("/getallreportsofAgency")
.get(
  AuthConroller.protect,
  AuthConroller.restrictTo("admin"),
  ReportController.getNumberOfReportsForAgency
);

module.exports = reportRouter;
