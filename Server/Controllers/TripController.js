const express = require("express");
const client = require("../db");

exports.getAllTrips = async (req, res) => {
  try {
    client.query("SELECT * FROM TRIP", (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error in fetching data from trip");
      } else {
        res.status(200).json(result.rows);
        console.log(result.rows);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getTripById = async (req, res) => {
  try {
    trip_id = req.params.trip_id;
    client.query(
      "SELECT * FROM TRIP WHERE Trip_ID=$1",
      [trip_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        } else {
          res.status(200).json(result.rows);
          console.log(result.rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.deleteTrip = async (req, res) => {
  const TravelAgency_ID = req.user.user_id;
  const Trip_id = req.params.trip_id;
  const user_id = req.user.user_id;
  const Trip = await client.query("SELECT * FROM TRIP WHERE Trip_ID=$1", [
    Trip_id,
  ]);
  if (Trip.rowCount == 0) {
    return res.status(404).json({
      status: "failed",
      message: "Trip not found",
    });
  }
  // console.log(Trip.rows[0].travelagency_id, user_id);
  if (Trip.rows[0].travelagency_id != user_id) {
    return res.status(401).json({
      status: "failed",
      message: "You are not allowed to delete this Trip",
    });
  }
  try {
    trip_id = req.params.trip_id;
    await client.query("BEGIN");
    const rows = await client.query("DELETE FROM TRIP WHERE Trip_id=$1", [
      trip_id,
    ]);
    await client.query("COMMIT");
    if (rows.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Trip not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error deleting trip:", err);
    res.status(500).send("Error in deleting trip");
  }
};

exports.addTrip = async (req, res) => {
  const { Description, Price, MaxSeats, Destinition, Duration, StartLocation } =
    req.body;
  const TravelAgency_ID = req.user.user_id;

  // Validate input
  if (
    !Description ||
    !Price ||
    !MaxSeats ||
    !Destinition ||
    !Duration ||
    !StartLocation
  ) {
    return res.status(400).json({
      success: false,
      error: "Please provide all details",
    });
  }
  if (isNaN(Price) || isNaN(MaxSeats) || isNaN(TravelAgency_ID)) {
    return res.status(400).json({
      success: false,
      error: "Price, MaxSeats, and TravelAgency_ID must be valid numbers",
    });
  }

  try {
    await client.query("BEGIN");

    // // Insert into the trip table

    const tripResult = await client.query(
      "INSERT INTO TRIP (Description, Price, MaxSeats, Destinition, Duration, StartLocation ,TravelAgency_ID) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING Trip_ID",
      [
        Description,
        Price,
        MaxSeats,
        Destinition,
        Duration,
        StartLocation,
        TravelAgency_ID,
      ]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Trip created successfully",
      data: tripResult.rows,
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: "Error in creating Trip" });
  }
};

exports.updateTrip = async (req, res) => {
  const { Description, Price, MaxSeats, Destinition, Duration, StartLocation } =
    req.body;
  const TravelAgency_ID = req.user.user_id;
  const Trip_id = req.params.Trip_id;
  const user_id = req.user.user_id;

  // Validate input
  if (
    !Description ||
    !Price ||
    !MaxSeats ||
    !Destinition ||
    !Duration ||
    !StartLocation
  ) {
    return res.status(400).json({
      success: false,
      error: "Please provide all details",
    });
  }
  if (isNaN(Price) || isNaN(MaxSeats) || isNaN(TravelAgency_ID)) {
    return res.status(400).json({
      success: false,
      error: "Price, MaxSeats, and TravelAgency_ID must be valid numbers",
    });
  }

  try {
    await client.query("BEGIN");

    const Trip = await client.query("SELECT * FROM TRIP WHERE Trip_ID=$1", [
      Trip_id,
    ]);

    if (Trip.rowCount == 0) {
      return res.status(404).json({
        status: "failed",
        message: "Trip not found",
      });
    }

    if (Trip.rows[0].travelagency_id != user_id) {
      return res.status(401).json({
        status: "failed",
        message: "You are not allowed to update this Trip",
      });
    }

    const tripResult = await client.query(
      "UPDATE TRIP SET Description = $1, Price = $2, MaxSeats= $3, Destinition= $4, Duration = $5, StartLocation =$6 ,TravelAgency_ID= $7 WHERE Trip_id= $8 Returning Trip_ID",
      [
        Description,
        Price,
        MaxSeats,
        Destinition,
        Duration,
        StartLocation,
        TravelAgency_ID,
        Trip_id,
      ]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      // data: tripResult.rows,
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: "Error in updating Trip" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    trip_id = req.params.trip_id;
    const TRAVELLER_ID = req.user.user_id;

    client.query(
      `SELECT trp.TRIP_ID,trp.Description,trp.Price,trp.MaxSeats,trp.Destinition,trp.Duration,trp.StartLocation
          FROM traveller as trv, trip as trp, tickets as tick
          WHERE trv.TRAVELLER_ID=tick.TRAVELLER_ID AND trp.TRIP_ID=tick.TRIP_ID
          AND trv.TRAVELLER_ID=$1`,

      [TRAVELLER_ID],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        } else {
          res.status(200).json(result.rows);
          console.log(result.rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.getAllPromotions = async (req, res) => {
  const travelAgency_id = req.user.user_id;
  // const Trip_id = req.params.Trip_ID;

  console.log(req.user, req.params, travelAgency_id);

  if (isNaN(travelAgency_id)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID should be a number",
    });
  }
  await client.query("BEGIN");

  const promotions = await client.query(
    "SELECT * FROM promote WHERE travelAgency_id = $1",
    [travelAgency_id]
  );
  if (promotions.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "This travelAgency does not have promotions",
    });
  }

  try {
    const promotionsRes = await client.query(
      "SELECT * FROM Promote WHERE travelagency_id = $1",
      [travelAgency_id]
    );

    await client.query("COMMIT");
    return res.status(200).json({
      status: true,
      data: promotionsRes.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      status: false,
      error: "error in retriving the data",
    });
  }
};

exports.PromoteTrip = async (req, res) => {
  const { EXPIRY_DATE, PRECENTAGE } = req.body;
  const TravelAgency_ID = req.user.user_id;
  const Trip_ID = req.params.Trip_ID;

  if (isNaN(PRECENTAGE)) {
    return res.status(400).json({
      success: false,
      error: "PRECENTAGE must be valid number",
    });
  }

  try {
    await client.query("Begin");

    if (!TravelAgency_ID || !Trip_ID || !EXPIRY_DATE || !PRECENTAGE)
      return res.status(400).json({
        status: false,
        message: "Please provide all data",
      });

    await client.query(
      `INSERT INTO Promote (TravelAgency_ID, Trip_ID, EXPIRY_DATE, PRECENTAGE)
                   VALUES ($1,$2,$3,$4)`,
      [TravelAgency_ID, Trip_ID, EXPIRY_DATE, PRECENTAGE]
    );

    await client.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Promotion added successfully",
      // data: tripResult.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      status: false,
      error: "error in adding a promotion",
    });
  }
};

exports.deletePromotion = async (req, res) => {
  const TravelAgency_ID = req.user.user_id;
  const Trip_ID = req.params.Trip_ID;

  const Queryres = await client.query(
    "SELECT * FROM promote WHERE trip_id=$1 AND TravelAgency_ID=$2",
    [Trip_ID,TravelAgency_ID]
  );
  if (Queryres.rowCount == 0)
    return res.status(404).json({
      status: false,
      message: "There is no such promotion for this travel_agency!",
    });
  const Promote = await client.query("SELECT * FROM Promote WHERE Trip_ID=$1", [
    Trip_ID,
  ]);

  if (Promote.rows[0].travelagency_id != TravelAgency_ID) {
    return res.status(401).json({
      status: "failed",
      message: "You are not allowed to delete promotion to this Trip",
    });
  }


  try {
    await client.query("delete from promote where trip_id=$1 AND TravelAgency_ID=$2", [Trip_ID,TravelAgency_ID]);
    return res.status(500).json({
      status: false,
      message: "Promotion deleted Successfully!",
    });
  } catch (er) {
    return res.status(500).json({
      status: false,
      message: "error in deleteing promotion",
    });
  }
};
