const express = require("express");
// const TripController = require("../Controllers/TripController");
const TicketRouter = express.Router({ mergeParams: true });
const AuthConroller = require("../Controllers/AuthorizationController");
const UserConroller = require("../Controllers/UserConroller");
const TicketController = require("../Controllers/TicketController");

TicketRouter.route("/getAllTickets").get(
  AuthConroller.protect,
  AuthConroller.restrictTo("traveller"),
  TicketController.getAllTickets
);

TicketRouter
  .route("/addTicket/:trip_id")
  .post(
    AuthConroller.protect,
    AuthConroller.restrictTo("traveller"),
    TicketController.addTicket
);

TicketRouter
  .route("/deleteTicket")
  .delete(
    AuthConroller.protect,
    AuthConroller.restrictTo("traveller"),
    TicketController.deleteTicket
);

module.exports = TicketRouter;
