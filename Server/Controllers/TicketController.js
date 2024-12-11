const express = require("express");
const client = require("../db");

exports.getAllTickets = async (req, res) => {
  const TRAVELLER_ID = req.user.user_id;

  if (isNaN(TRAVELLER_ID)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID should be a number",
    });
  }
  await client.query("BEGIN");

  const tickets = await client.query(
    `
      SELECT tick.* , trp.name as trip_name, trp.startdate as trip_startDate, users.profilename as traveller_name
	    ,array_agg(TP.PHOTO) AS photos
      FROM tickets tick
      LEFT JOIN trip trp on trp.Trip_ID = tick.trip_id
      LEFT JOIN users on tick.traveller_id = users.user_id
      LEFT JOIN TripPhotos AS TP ON trp.TRIP_ID = TP.TRIP_ID
      WHERE TRAVELLER_ID = $1
      GROUP BY 
      tick.ticket_id, trp.name,trp.startdate,users.profilename
    `,
    [TRAVELLER_ID]
  );
  if (tickets.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "This traveller does not have tickets",
    });
  }

  try {
    const ticketsRes = await client.query(
      `
      SELECT tick.* , trp.name as trip_name, trp.startdate as trip_startDate, users.profilename as traveller_name
	    ,array_agg(TP.PHOTO) AS photos
      FROM tickets tick
      LEFT JOIN trip trp on trp.Trip_ID = tick.trip_id
      LEFT JOIN users on tick.traveller_id = users.user_id
      LEFT JOIN TripPhotos AS TP ON trp.TRIP_ID = TP.TRIP_ID
      WHERE TRAVELLER_ID = $1
      GROUP BY 
      tick.ticket_id, trp.name,trp.startdate,users.profilename
    `,
      [TRAVELLER_ID]
    );

    await client.query("COMMIT");
    console.log(ticketsRes.rows);
    return res.status(200).json({
      status: true,
      data: ticketsRes.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      status: false,
      error: "error in retriving the data",
    });
  }
};

exports.addTicket = async (req, res) => {
  const { NumberOfSeats, Price } = req.body;
  const TRAVELLER_ID = req.user.user_id;
  const TRIP_ID = req.params.trip_id;

  console.log(TRIP_ID, TRAVELLER_ID);

  // Validate input
  if (!NumberOfSeats || !Price) {
    return res.status(400).json({
      success: false,
      error: "Please provide all details",
    });
  }

  const tickets = await client.query("SELECT * FROM trip WHERE TRIP_ID = $1", [
    TRIP_ID,
  ]);

  if (tickets.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "There is no such trip ",
    });
  }
  try {
    await client.query("BEGIN");

    // // Insert into the tickets table

    const ticketsResult = await client.query(
      "INSERT INTO Tickets ( NumberOfSeats, Price, TRAVELLER_ID, TRIP_ID,DATE) VALUES($1, $2, $3, $4,CURRENT_DATE)",
      [NumberOfSeats, Price, TRIP_ID, TRAVELLER_ID]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "ticket created successfully",
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res
      .status(500)
      .json({ success: false, error: "Error in creating tickets" });
  }
};

exports.deleteTicket = async (req, res) => {
  const TRAVELLER_ID = req.user.user_id;
  const trip_id = req.params.trip_id;

  if (!trip_id) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide the trip id",
    });
  }

  if (isNaN(TRAVELLER_ID) || isNaN(trip_id)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID and trip_id should be a number",
    });
  }

  const tickets = await client.query(
    "SELECT * FROM tickets WHERE TRAVELLER_ID = $1 AND TRIP_ID = $2",
    [TRAVELLER_ID, trip_id]
  );

  if (tickets.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "There is no such ticket with this trip id and traveller id",
    });
  }

  try {
    await client.query("BEGIN");
    const reportResult = await client.query(
      "DELETE FROM tickets WHERE TRAVELLER_ID = $1 AND TRIP_ID = $2",
      [TRAVELLER_ID, trip_id]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "ticket deleted successfully",
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: "Error in deleting ticket" });
  }
};
