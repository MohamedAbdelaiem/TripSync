import React from "react";
import AdminReport from "./AdminReport";
import "./AllReportsList.css";

function AllReportsList({ all_reports, userId }) {
  const deleteReport = (report_id)=> {console.log(`delete report with id: ${report_id}`)}
  const blockAgency = (agency_id)=> {console.log(`block agency with id: ${agency_id}`);}
  const viewUserProfile = (traveller_id)=> {console.log(`view traveller with id: ${traveller_id}`);}
  const viewAgencyProfile = (agency_id)=> {console.log(`view agency with id: ${agency_id}`);}
  return (
    <div className="all-reports-container">
      <h2>All Reports</h2>
      <div className="reports-list">
        {all_reports.map((report) => (
          <AdminReport
            key={report.id}
            report={report}
            onDeleteReport={deleteReport}
            onBlockAgency={blockAgency}
            navigateToUserProfile={viewUserProfile}
            navigateToAgencyProfile={viewAgencyProfile}
          />
        ))}
      </div>
    </div>
  );
}

export default AllReportsList;
