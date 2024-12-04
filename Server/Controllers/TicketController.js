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
    "SELECT * FROM tickets WHERE TRAVELLER_ID = $1",
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
      "SELECT * FROM tickets WHERE TRAVELLER_ID = $1",
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

// exports.addTicket = async (req, res) => {
//   const { NumberOfSeats, Price } = req.body;
//   const TRAVELLER_ID = req.user.user_id;
//   const TRIP_ID = req.params.trip_id;

//   console.log(TRIP_ID, TRAVELLER_ID);

//   // Validate input
//   if (!NumberOfSeats || !Price) {
//     return res.status(400).json({
//       success: false,
//       error: "Please provide all details",
//     });
//   }

//   const tickets = await client.query("SELECT * FROM trip WHERE TRIP_ID = $1", [
//     TRIP_ID,
//   ]);

//   if (tickets.rows.length === 0) {
//     return res.status(404).json({
//       status: "false",
//       message: "There is no such trip ",
//     });
//   }
//   try {
//     await client.query("BEGIN");

//     // // Insert into the tickets table

//     const ticketsResult = await client.query(
//       "INSERT INTO Tickets ( NumberOfSeats, Price, TRAVELLER_ID, TRIP_ID) VALUES($1, $2, $3, $4)",
//       [NumberOfSeats, Price, TRIP_ID, TRAVELLER_ID]
//     );

//     await client.query("COMMIT");

//     res.status(200).json({
//       success: true,
//       message: "tickets created successfully",
//     });
//   } catch (err) {
//     // Rollback the transaction if there's an error
//     await client.query("ROLLBACK");
//     res
//       .status(500)
//       .json({ success: false, error: "Error in creating tickets" });
//   }
// };

// exports.deleteTicket = async (req, res) => {
//   const traveller_id = req.user.user_id;
//     const travelAgency_id = req.params.user_id;

//   const travellAgency = await client.query(
//     "SELECT * FROM travelAgency WHERE travelagency_id = $1",
//     [travelAgency_id]
//   );

//   if (travellAgency.rows.length === 0) {
//     return res.status(404).json({
//       status: "false",
//       message: "There is no such travelAgency ",
//     });
//     }

//   const tickets = await client.query(
//     "SELECT * FROM tickets WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2",
//     [travelAgency_id, traveller_id]
//   );

//   if (tickets.rows.length === 0) {
//     return res.status(404).json({
//       status: "false",
//       message: "There is no such tickets to delete ",
//     });
//     }

//   try {
//     await client.query("BEGIN");
//     await client.query(
//       "DELETE FROM tickets WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2",
//       [travelAgency_id, traveller_id]
//     );
//     await client.query("COMMIT");
//     res.status(200).json({
//       status: "success",
//       message: "tickets deleted successfully",
//     });
//   } catch (err) {
//     await client.query("ROLLBACK");
//     res.status(500).json({
//       status: "failed",
//       message: "Internal Server Error",
//     });
//     console.log(err);
//   }
// };
