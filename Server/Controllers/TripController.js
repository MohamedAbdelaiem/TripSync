const express = require("express");
const client = require("../db");
const { start } = require("repl");

exports.getAllTripsOfAgency = async (req, res) => {
  const TRAVELAGENCY_ID = req.user.user_id;


  try {
    client.query(
      `
      SELECT 
        T.Trip_ID,
        T.Name,
        T.Description,
        T.Price,
        T.MaxSeats,
        T.Destinition,
        T.StartDate,
        T.EndDate,
        T.StartLocation,
        T.TravelAgency_ID,
        T.Sale,
        T.SalePrice,
        COALESCE(
          JSON_AGG(
            TP.PHOTO
          ) FILTER (WHERE TP.PHOTO IS NOT NULL), 
          '[]'
        ) AS Photos
      FROM 
        Trip T
      LEFT JOIN 
        TripPhotos TP ON T.Trip_ID = TP.TRIP_ID
        WHERE  T.TravelAgency_ID=$1
      GROUP BY 
        T.Trip_ID;`,
      [TRAVELAGENCY_ID],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data from trip");
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
exports.getAllTripsForAdmin = async (req, res) => {
  try {
    client.query(
      `
      SELECT 
    T.Trip_ID,
    T.Name,
    T.Description,
    T.Price,
    T.MaxSeats,
    T.Destinition,
    T.StartDate,
    T.EndDate,
    T.StartLocation,
    T.TravelAgency_ID,
    T.Sale,
    T.SalePrice,
    COALESCE(
        JSON_AGG(
            TP.PHOTO
        ) FILTER (WHERE TP.PHOTO IS NOT NULL), 
        '[]'
    ) AS Photos,
    U.username AS Organizer
FROM 
    Trip T
LEFT JOIN 
    TripPhotos TP ON T.Trip_ID = TP.TRIP_ID
LEFT JOIN 
    Users U ON T.TravelAgency_ID = U.USER_ID -- Join with Users to get the username of the travel agency
GROUP BY 
    T.Trip_ID, U.username;
`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data from trip");
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.getTripById = async (req, res) => {
  try {
    trip_id = req.params.trip_id;
    client.query(
      `SELECT 
    T.Trip_ID AS trip_id,
    T.Name AS name,
    T.Description AS description,
    T.Price AS price,
    T.MaxSeats AS maxseats,
    T.Destinition AS destinition,
    T.startDate AS start_date,
    T.endDate AS end_date,
    T.StartLocation AS startlocation,
    T.TravelAgency_ID AS organizer_id,
    T.Sale,
    T.SalePrice,
    COALESCE(ARRAY_AGG(TP.PHOTO), ARRAY[]::VARCHAR[]) AS photos,
    U.ProfileName AS organizer_name
FROM 
    Trip T
LEFT JOIN 
    TripPhotos TP
ON 
    T.Trip_ID = TP.TRIP_ID
LEFT JOIN 
    TravelAgency TA
ON 
    T.TravelAgency_ID = TA.TravelAgency_ID
LEFT JOIN 
    Users U
ON 
    TA.TravelAgency_ID = U.USER_ID
WHERE 
    T.Trip_ID = $1
GROUP BY 
    T.Trip_ID, T.Name, T.Description, T.Price, T.MaxSeats, 
    T.Destinition, T.startDate, T.endDate, T.StartLocation, 
    T.TravelAgency_ID, U.ProfileName;

`,
      [trip_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        } else {
          res.status(200).json(result.rows);
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

  if (req.user.role !== "admin" && Trip.rows[0].travelagency_id != user_id) {
    return res.status(403).json({
      status: "failed",
      message: "You are not authorized to delete this trip",
    });
  }

  try {
    // Trip_id = req.params.trip_id;
    await client.query("BEGIN");
    const rows = await client.query("DELETE FROM TRIP WHERE Trip_id=$1", [
      Trip_id,
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
  const {
    Description,
    Price,
    MaxSeats,
    Destinition,
    endDate,
    startDate,
    StartLocation,
    photos,
    sale,
    saleprice,
    TravelAgency_ID,
  } = req.body;
  // const TravelAgency_ID = req.user.user_id;

  // Validate input
  if (
    !Description ||
    !Price ||
    !MaxSeats ||
    !Destinition ||
    !startDate ||
    !endDate ||
    !StartLocation ||
    !photos ||
    !TravelAgency_ID
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

  let tripResult;
  try {
    await client.query("BEGIN");
    // // Insert into the trip table
    // if (!sale) sale = false;

    try {
      tripResult = await client.query(
        "INSERT INTO TRIP (Description, Price, MaxSeats, Destinition, startDate,endDate, StartLocation ,TravelAgency_ID,sale,saleprice) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10) RETURNING Trip_ID",
        [
          Description,
          Price,
          MaxSeats,
          Destinition,
          startDate,
          endDate,
          StartLocation,
          TravelAgency_ID,
          sale,
          saleprice,
        ]
      );

    } catch (sqlError) {
      console.log(sqlError);
    }

    try {
      photos.forEach((photo) => {
        client.query("INSERT INTO TripPhotos (Trip_ID, PHOTO) VALUES($1, $2)", [
          tripResult.rows[0].trip_id,
          photo,
        ]);
        console.log(photo);
      });
    } catch (sqlError) {
      console.log(sqlError);
    }

    await client.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Trip created successfully",
      data: tripResult.rows[0],
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: err });
  }
};

exports.updateTrip = async (req, res) => {
  const {
    Description,
    Price,
    MaxSeats,
    Destinition,
    endDate,
    startDate,
    StartLocation,
    photos,
    sale,
    saleprice,
  } = req.body;
  const TravelAgency_ID = req.user.user_id;
  const Trip_id = req.params.Trip_id;
  const user_id = req.user.user_id;

  // Validate input
  if (
    !Description ||
    !Price ||
    !MaxSeats ||
    !Destinition ||
    !startDate ||
    !endDate ||
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
      "UPDATE TRIP SET Description = $1, Price = $2, MaxSeats= $3, Destinition= $4, startDate = $5, endDate=$9,StartLocation =$6 ,TravelAgency_ID= $7,sale=$10,saleprice=$11 WHERE Trip_id= $8 Returning Trip_ID",
      [
        Description,
        Price,
        MaxSeats,
        Destinition,
        startDate,
        StartLocation,
        TravelAgency_ID,
        Trip_id,
        endDate,
        sale,
        saleprice,
      ]
    );

    const deletePhotos = await client.query(
      "DELETE FROM TripPhotos WHERE Trip_ID=$1",
      [Trip_id]
    );

    photos.forEach((photo) => {
      client.query("INSERT INTO TripPhotos (Trip_ID, PHOTO) VALUES($1, $2)", [
        tripResult.rows[0].trip_id,
        photo,
      ]);
    });

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      // data: tripResult.rows,
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: err });
  }
};

exports.getHistory = async (req, res) => {
  try {
    trip_id = req.params.trip_id;
    const TRAVELLER_ID = req.user.user_id;

    client.query(
      `SELECT trp.TRIP_ID,trp.Description,trp.Price,trp.MaxSeats,trp.Destinition,trp.StartLocation
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
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.getTripsForUser_id = async (req, res) => {
  try {
    const traveller_id = req.params.user_id;
    client.query(
      `SELECT 
    trp.TRIP_ID, 
    trp.Description, 
    trp.Price, 
    trp.MaxSeats, 
    trp.Destinition, 
    trp.StartLocation, 
    trav_agency.ProfileName AS organizer, 
    trp.StartDate AS start_date, 
    trp.EndDate AS end_date, 
    trp.Name,
    array_agg(TP.PHOTO) AS photos
FROM 
    traveller AS trv
JOIN 
    tickets AS tick ON trv.TRAVELLER_ID = tick.TRAVELLER_ID
JOIN 
    trip AS trp ON trp.TRIP_ID = tick.TRIP_ID
JOIN users as trav_agency on trp.TravelAgency_ID = trav_agency.USER_ID
LEFT JOIN 
    TripPhotos AS TP ON trp.TRIP_ID = TP.TRIP_ID
WHERE 
    trv.TRAVELLER_ID = $1
GROUP BY 
    trp.TRIP_ID, trp.Description, trp.Price, trp.MaxSeats, trp.Destinition, 
    trp.StartLocation, trav_agency.ProfileName, trp.StartDate, trp.EndDate, trp.Name
`,
      [traveller_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Error in fetching data",
    });
  }
};
exports.getTripsForAgency_id = async (req, res) => {
  try {
    const travelAgency_id = req.params.user_id;

    client.query(
      `
      SELECT 
        T.Trip_ID,
        T.Name,
        T.Description,
        T.Price,
        T.MaxSeats,
        T.Destinition,
        T.StartDate,
        T.EndDate,
        T.StartLocation,
        T.TravelAgency_ID,
        T.Sale,
        T.SalePrice,
        COALESCE(
          JSON_AGG(
            TP.PHOTO
          ) FILTER (WHERE TP.PHOTO IS NOT NULL), 
          '[]'
        ) AS Photos
      FROM 
        Trip T
      LEFT JOIN 
        TripPhotos TP ON T.Trip_ID = TP.TRIP_ID
        WHERE  T.TravelAgency_ID=$1
      GROUP BY 
        T.Trip_ID;`,
      [travelAgency_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Error in fetching data",
    });
  }
};

exports.getAllPromotions = async (req, res) => {
  const travelAgency_id = req.user.user_id;
  // const Trip_id = req.params.Trip_ID;


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
    [Trip_ID, TravelAgency_ID]
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
    await client.query(
      "delete from promote where trip_id=$1 AND TravelAgency_ID=$2",
      [Trip_ID, TravelAgency_ID]
    );
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


exports.availbleSeats = async (req, res) => {
  const { trip_id } = req.params;

  if (!trip_id) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide the trip id",
    });
  }
  try{
    const result = await client.query("SELECT * FROM Tickets WHERE TRIP_ID = $1", [trip_id]);
    const totalSeats = result.rows.reduce((acc, curr) => acc + curr.numberofseats, 0);
    const maxSeats = await client.query("SELECT maxseats FROM trip WHERE TRIP_ID = $1", [trip_id]);
    const availableSeats = maxSeats.rows[0].maxseats - totalSeats;
    res.status(200).json({
      status: true,
      data: availableSeats,
    });
  }
  catch(err){
    res.status(500).json({ success: false, error: "Error in getting available seats" });
  }
};  

exports.most5tripsPurchased = async (req, res) => {
  try {
    client.query(
      `SELECT 
    T.Trip_ID,
    T.Name,
    T.Description,
    T.Price,
    T.MaxSeats,
    T.Destinition,
    T.StartDate,
    T.EndDate,
    T.StartLocation,
    T.TravelAgency_ID,
    T.Sale,
    T.SalePrice,
    COALESCE(
        JSON_AGG(
            TP.PHOTO
        ) FILTER (WHERE TP.PHOTO IS NOT NULL), 
        '[]'
    ) AS Photos,
    U.username AS Organizer,
    COALESCE(SUM(TK.NumberOfSeats), 0) AS TotalBookedSeats
FROM 
    Trip T
LEFT JOIN 
    TripPhotos TP ON T.Trip_ID = TP.TRIP_ID
LEFT JOIN 
    Users U ON T.TravelAgency_ID = U.USER_ID -- Join with Users to get the username of the travel agency
LEFT JOIN 
    Tickets TK ON T.Trip_ID = TK.TRIP_ID -- Join with Tickets to calculate the total booked seats
GROUP BY 
    T.Trip_ID, U.username
ORDER BY 
    TotalBookedSeats DESC
LIMIT 5;
`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error in fetching data");
        }
        res.status(200).json(result.rows);
      }
    );
  }
  catch (e) {
    res.status(500).json({
      status: false,
      message: "Error in fetching data",
    });
  }
}
