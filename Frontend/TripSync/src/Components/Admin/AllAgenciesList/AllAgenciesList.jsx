import React from "react";
import "./AllAgenciesList.css";
import AgencyCard from "./AgencyCard";
function AllAgenciesList({ all_agencies,rerender }) {
  // console.log(all_travellers[0]);
  return (
    <div className="all-agencies-list-container">
      <div className="stat-card-agencies total">
        <span className="stat-number-agency">{all_agencies.length}</span>
        <span className="stat-label-agency">Total Agencies</span>
      </div>
      {all_agencies.length > 0 ? (
        <ul className="agencies-list">
          {all_agencies.map((agen, idx) => (
            <li key={idx} className="agencies-list-item">
              <AgencyCard
                image_url={agen.profilephoto}
                id={agen.travelagency_id}
                prof_name={agen.profilename}
                rerender={rerender}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="no-agencies">There no Travel Agencies</h1>
      )}
    </div>
  );
}

export default AllAgenciesList;
