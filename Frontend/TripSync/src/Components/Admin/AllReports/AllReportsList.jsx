import React from "react";
import AdminReport from "./AdminReport";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./AllReportsList.css";

function AllReportsList({ all_reports, userId, rerender }) {
  const navigate = useNavigate();
  const deleteReport = async(traveller_id,travelAgency_id) => {
    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/reports/deleteReportForAdmin`, {
        data: {
          traveller_id: traveller_id,
          travelAgency_id: travelAgency_id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      rerender();
    }
    catch(err){
      console.log(err);
    }
  };
  const blockAgency = async(agency_id) => {
    await axios
      .delete(`http://localhost:3000/api/v1/users/deleteUser`, {
        data: {
          user_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("user deleted");
        rerender();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`block agency with id: ${agency_id}`);
  };
  const viewUserProfile = (traveller_id) => {
    navigate(`/traveller-profile/${traveller_id}`);
    console.log(`view traveller with id: ${traveller_id}`);
  };
  const viewAgencyProfile = (agency_id) => {
    navigate(`/travel-agency/${agency_id}`);
    console.log(`view agency with id: ${agency_id}`);
  };
  return (
    <div className="all-reports-container">
      <h2>All Reports</h2>
      <div className="stat-card-report total">
          <span className="stat-number-report">{all_reports.length}</span>
          <span className="stat-label-report">Total Reports</span>
      </div>
      <div className="reports-list">
        {all_reports.map((report, idx) => (
          <AdminReport
            key={idx}
            report={report}
            onDeleteReport={deleteReport}
            onBlockAgency={blockAgency}
            navigateToUserProfile={viewUserProfile}
            navigateToAgencyProfile={viewAgencyProfile}
            rerender={rerender}
          />
        ))}
      </div>
    </div>
  );
}

export default AllReportsList;
