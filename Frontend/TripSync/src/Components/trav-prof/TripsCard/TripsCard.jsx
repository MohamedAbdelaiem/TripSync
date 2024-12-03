import React, { useState } from "react";
import "../../../pages/UserTripsList/UserTripsList.css";

import { FaMapMarkerAlt, FaRegStar, FaClock } from "react-icons/fa";
import { Navigate } from "react-router-dom";

function TripCard({
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
    console.log("clickexx")
    Navigate(`/trip-details/:${tripId}`);
  };
  return (
    <div className="trip-card">
      <div className="trip-image-section">
        <img src={image} alt={name} className="trip-image" />
      </div>
      <div className="trip-info-section">
        <div className="trip-header">
          <h2 className="trip-name">{name}</h2>
          {status === "not-started" && (
            <div className="trip-status not-started">Not started</div>
          )}
          {status === "finished" && (
            <div className="trip-status finished">finished</div>
          )}
        </div>
        <p className="trip-organizer">Organized by: {organizer}</p>
        <p className="trip-locations">
          <FaMapMarkerAlt className="icon" /> From {startLocation} to{" "}
          {endLocation}
        </p>
        <p className="trip-dates">
          <FaClock className="icon" />{" "}
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()} ({duration} days)
        </p>
        <div className="trip-footer">
          <button className="trip-button" onClick={viewTripDetails_clicked}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
