import React from "react";
import "./AllTripsList.css";
import AdminTripCard from "./adminTripCard";

function AllTripsList({ all_trips, rerender }) {
  // Calculate trip statistics
  const totalTrips = all_trips.length;
  const notStartedTrips = all_trips.filter(
    trip => new Date(trip.startdate) > new Date()
  ).length;
  const finishedTrips = all_trips.filter(
    trip => new Date(trip.startdate) <= new Date()
  ).length;

  return (
    <div className="all-trips-list-container">
      <div className="trips-statistics">
        <div className="stat-card total">
          <span className="stat-number">{totalTrips}</span>
          <span className="stat-label">Total Trips</span>
        </div>
        <div className="stat-card not-started">
          <span className="stat-number">{notStartedTrips}</span>
          <span className="stat-label">Not Started</span>
        </div>
        <div className="stat-card finished">
          <span className="stat-number">{finishedTrips}</span>
          <span className="stat-label">Finished</span>
        </div>
      </div>
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