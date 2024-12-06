import React, { useState } from "react";
import "./AllTripsList.css"
import "../../../pages/UserTripsList/UserTripsList.css"

import { FaMapMarkerAlt, FaRegStar, FaClock } from "react-icons/fa";
import { Navigate } from "react-router-dom";

function AdminTripCard({
  tripId,
  image,
  name,
  organizer,
  startLocation,
  endLocation,
  startDate,
  endDate,
  duration,
  status,
}) {

  const viewTripDetails_clicked = () => {
    // go to trip details with trip id
    // Navigate(`/trip-details/:${tripId}`);
  };

  return (
    <div className="admin-trip-card">
      <div className="admin-trip-image-section">
        <img src={image} alt={name} className="admin-trip-image" />
      </div>
      <div className="admin-trip-info-section">
        <div className="admin-trip-header">
          <h2 className="admin-trip-name">{name}</h2>
          {status === "not-started" && (
            <div className="trip-status not-started">Not started</div>
          )}
          {status === "finished" && (
            <div className="trip-status finished">finished</div>
          )}
        </div>
        <p className="admin-trip-organizer">Organized by: {organizer}</p>
        <p className="admin-trip-locations">
          <FaMapMarkerAlt className="admin-icon" /> From {startLocation} to{" "}
          {endLocation}
        </p>
        <p className="admin-trip-dates">
          <FaClock className="admin-icon" />{" "}
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()} ({duration} days)
        </p>
        <div className="admin-trip-footer">
          <button className="admin-trip-button" onClick={viewTripDetails_clicked}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminTripCard;
