import React from "react";
import "./AllAgenciesList.css";
import AgencyCard from "./AgencyCard";
function AllAgenciesList({ all_agencies }) {
  // console.log(all_travellers[0]);
  return (
    <div className="all-agencies-list-container">
      {all_agencies.length > 0 ? (
        <ul className="agencies-list">
          {all_agencies.map((agen) => (
            <li key={agen.TravelAgencyID} className="agencies-list-item">
              <AgencyCard
                image_url={agen.ProfilePicture}
                id={agen.TravelAgencyID}
                prof_name={agen.ProfileName}
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
