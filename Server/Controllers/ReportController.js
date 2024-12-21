const express = require("express");
const client = require("../db");

exports.getAllReports=async(req,res)=>{
  try{
    const reports=await client.query(`SELECT DISTINCT
    TravellerUser.USER_ID AS TravellerID,
    TravellerUser.ProfileName AS TravellerProfileName,
    TravellerUser.ProfilePhoto AS TravellerProfilePhoto,
    TravelAgencyUser.USER_ID AS TravelAgencyID,
    TravelAgencyUser.ProfileName AS TravelAgencyProfileName,
    TravelAgencyUser.ProfilePhoto AS TravelAgencyProfilePhoto,
    R.DESCRIPTION,
    R.DATE
FROM 
    Report R
JOIN 
    Traveller T ON T.TRAVELLER_ID = R.TRAVELLER_ID
JOIN 
    TravelAgency TA ON TA.TravelAgency_ID = R.TRAVEL_AGENCY_ID
JOIN 
    Users TravellerUser ON TravellerUser.USER_ID = T.TRAVELLER_ID
JOIN 
    Users TravelAgencyUser ON TravelAgencyUser.USER_ID = TA.TravelAgency_ID
ORDER BY 
    R.DATE DESC;

`);
    if(reports.rows.length===0){
      return res.status(404).json({
        status:"false",
        message:"There are no reports",
      });
    }
    res.status(200).json({
      status:"true",
      data:reports.rows,
    });
  }
  catch(e){
    console.log(e);
    res.status(400).send("Error in fetching data from report");
  }
}

exports.getAllReportsForTravelAgency = async (req, res) => {
  const travel_agency_id = req.params.user_id;

  if (isNaN(travel_agency_id)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID should be a number",
    });
  }
  await client.query("BEGIN");

  const reports = await client.query(
    "SELECT * FROM report WHERE travel_agency_id = $1",
    [travel_agency_id]
  );
  if (reports.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "This travelAgency does not have reports",
    });
  }

  try {
    const reportsRes = await client.query(
      "SELECT * FROM report WHERE travel_agency_id = $1",
      [travel_agency_id]
    );

    await client.query("COMMIT");
    console.log(reportsRes.rows);
    return res.status(200).json({
      status: true,
      data: reportsRes.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      status: false,
      error: "error in retriving the data",
    });
  }
};

exports.addReport = async (req, res) => {
  const { description} = req.body;
  const TRAVELLER_ID = req.user.user_id;
  const travelagency_id = req.params.user_id;

  console.log(travelagency_id, TRAVELLER_ID,req.user.role);

  if (isNaN(travelagency_id)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID should be a number",
    });
  }

  // Validate input
  if (!description) {
    console.log(req.body.description);
    return res.status(400).json({
      success: false,
      error: "Please provide a description for the report",
    });
  }

  const reports = await client.query(
    "SELECT * FROM travelAgency WHERE travelagency_id = $1",
    [travelagency_id]
  );

  if (reports.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "There is no such travelAgency with this id",
    });
  }
  try {
    await client.query("BEGIN");
    const reportResult = await client.query(
      "INSERT INTO Report (Description, DATE ,TRAVEL_AGENCY_ID,TRAVELLER_ID) VALUES($1,CURRENT_DATE ,$2, $3)",
      [description, travelagency_id, TRAVELLER_ID]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "report created successfully",
      data: reportResult.rows,
    });
  } catch (err) {
    // Rollback the transaction if there's an error
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: "Error in creating report" });
  }
};

exports.deleteReport = async (req, res) => {
  const traveller_id = req.user.user_id;
  const travelAgency_id = req.params.user_id;

  const travellAgency = await client.query(
    "SELECT * FROM travelAgency WHERE travelagency_id = $1",
    [travelAgency_id]
  );

  if (travellAgency.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "There is no such travelAgency with this id",
    });
  }

  const reports = await client.query(
    "SELECT * FROM report WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2",
    [travelAgency_id, traveller_id]
  );

  if (reports.rows.length === 0) {
    return res.status(404).json({
      status: "false",
      message: "There is no such report to delete ",
    });
  }

  try {
    await client.query("BEGIN");
    await client.query(
      "DELETE FROM Report WHERE TRAVEL_AGENCY_ID=$1 AND TRAVELLER_ID=$2",
      [travelAgency_id, traveller_id]
    );
    await client.query("COMMIT");
    res.status(200).json({
      status: "success",
      message: "Report deleted successfully",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
    console.log(err);
  }
};

exports.deleteReportForAdmin = async (req, res) => {
  try{
    const traveller_id=req.body.traveller_id;
    const travelAgency_id=req.body.travelAgency_id;

    const deleteReport=await client.query(`DELETE FROM Report WHERE TRAVELLER_ID=$1 AND TRAVEL_AGENCY_ID=$2`,[traveller_id,travelAgency_id]);
    res.status(200).json({
      status:"true",
      message:"Report deleted successfully",
    });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "false",
        message: "Internal Server Error",
      });
    }
}

exports.getNumberOfReportsForAgency = async (req, res) => {
  try {
    const travelAgency_id=req.body.travelAgency_id;
    const reports = await client.query(
      `SELECT COUNT(*) FROM Report WHERE TRAVEL_AGENCY_ID=$1`,
      [travelAgency_id]
    );
    res.status(200).json({
      status: "true",
      data: reports.rows[0].count,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      status: "false",
      message: "Internal Server Error",
    });
  }
}