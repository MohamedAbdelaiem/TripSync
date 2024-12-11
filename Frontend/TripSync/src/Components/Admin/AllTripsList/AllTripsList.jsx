import React from "react";
import "./AllTripsList.css"
import AdminTripCard from "./adminTripCard";
function AllTripsList({ all_trips }) {
  return <div className="all-trips-list-container">
    <ul className="all-trips-menu-list">
      {all_trips.map((trip,idx) => (
        <li className="all-trips-menu-item" key={idx}>
          <AdminTripCard {...trip} />
        </li>
      ))} 
    </ul>
  </div>;
}

export default AllTripsList;
