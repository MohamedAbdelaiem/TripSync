import React from "react";
import "./AllTripsList.css"
import AdminTripCard from "./adminTripCard";
function AllTripsList({ all_trips, rerender }) {
  return (
    <div className="all-trips-list-container">
      <ul className="all-trips-menu-list">
        {all_trips.map((trip, idx) => (
          <li className="all-trips-menu-item" key={idx}>
            <AdminTripCard {...trip} rerender={rerender} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTripsList;
