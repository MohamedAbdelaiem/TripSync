import React from "react";
import "./AdminReport.css";

function AdminReport({
  report,
  onDeleteReport,
  onBlockAgency,
  navigateToUserProfile,
  navigateToAgencyProfile,
}) {
  return (
    <div className="report-container">
      <div className="report-header">
        <img
          src={report.travellerprofilephoto}
          alt={`${report.travellerprofilename}'s profile`}
          className="report-profile-photo"
          onClick={() => navigateToUserProfile(report.travellerid)}
        />
        <div className="report-user-info">
          <p
            className="report-user-name"
            onClick={() => navigateToUserProfile(report.travellerid)}
          >
            {report.user_name}
          </p>
          <p
            className="report-agency-name"
            onClick={() => navigateToAgencyProfile(report.travelagencyid)}
          >
            {report.travelagencyprofilename}
          </p>
        </div>
        <img
          src={report.travelagencyprofilephoto}
          alt={`${report.travelagencyprofilename}'s logo`}
          className="report-agency-photo"
          onClick={() => navigateToAgencyProfile(report.travelagencyid)}
        />
      </div>
      <div className="report-content">
        <p>{report.description}</p>
      </div>
      <div className="report-actions">
        <button
          className="delete-report-btn"
          // onClick={() => onDeleteReport(report.id)}
        >
          Delete Report
        </button>
        <button
          className="block-agency-btn"
          onClick={() => onBlockAgency(report.travelagencyid)}
        >
          Block Agency
        </button>
      </div>
    </div>
  );
}

export default AdminReport;
