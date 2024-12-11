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
          src={report.user_photo}
          alt={`${report.user_name}'s profile`}
          className="report-profile-photo"
          onClick={() => navigateToUserProfile(report.user_id)}
        />
        <div className="report-user-info">
          <p
            className="report-user-name"
            onClick={() => navigateToUserProfile(report.user_id)}
          >
            {report.user_name}
          </p>
          <p
            className="report-agency-name"
            onClick={() => navigateToAgencyProfile(report.agency_id)}
          >
            {report.agency_name}
          </p>
        </div>
        <img
          src={report.agency_photo}
          alt={`${report.agency_name}'s logo`}
          className="report-agency-photo"
          onClick={() => navigateToAgencyProfile(report.agency_id)}
        />
      </div>
      <div className="report-content">
        <p>{report.report_content}</p>
      </div>
      <div className="report-actions">
        <button
          className="delete-report-btn"
          onClick={() => onDeleteReport(report.id)}
        >
          Delete Report
        </button>
        <button
          className="block-agency-btn"
          onClick={() => onBlockAgency(report.agency_id)}
        >
          Block Agency
        </button>
      </div>
    </div>
  );
}

export default AdminReport;
