const express = require("express");
const client = require("../db");

exports.getAllReports=async(req,res)=>{
  try{
    const reports=await client.query("SELECT * FROM reports");
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
  const { DESCRIPTION} = req.body;
  const TRAVELLER_ID = req.user.user_id;
  const travelagency_id = req.params.user_id;

  if (isNaN(travelagency_id)) {
    return res.status(400).json({
      status: "failed",
      message: "TravelagencyID should be a number",
    });
  }

  // Validate input
  if (!DESCRIPTION) {
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
      [DESCRIPTION, travelagency_id, TRAVELLER_ID]
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
