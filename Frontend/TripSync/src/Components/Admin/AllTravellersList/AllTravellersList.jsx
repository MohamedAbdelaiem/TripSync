import React from "react";
import "./AllTravellersList.css"
import TravellerCard from "./TravellerCard";
function AllTravellersList({ all_travellers, rerender_admin, rerender }) {
  return (
    <div className="all-travellers-list-container">
        <div className="stat-card-traveller total">
            <span className="stat-number-traveller">{all_travellers.length}</span>
            <span className="stat-label-traveller">Total Travellers</span>
        </div>
      <ul className="travellers-list">
        {all_travellers.map((trav, idx) => (
          <li key={idx} className="travellers-list-item">
            <TravellerCard
              image_url={trav.profilephoto}
              id={trav.user_id}
              prof_name={trav.profilename}
              rerender = {rerender}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTravellersList;
