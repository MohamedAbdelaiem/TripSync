import React, { useState } from "react";
import "./TripsCard.css";

import { FaMapMarkerAlt, FaRegStar, FaClock } from "react-icons/fa";
import { Navigate } from "react-router-dom";

function TripCard({
  name,
  trip_id,
  description,
  price,
  maxseats,
  destinition,
  startlocation,
  photos,
  organizer,
  start_date,
  end_date,
}) {
  const viewTripDetails_clicked = () => {
    // go to trip details with trip id
    Navigate(`/trip-details/:${trip_id}`);
  };

  let current_date = new Date();

  let startDate = new Date(start_date);
  let endDate = new Date(end_date);

  const status = startDate > current_date ? "not-started" : "finished";

  let Difference_In_Time = endDate.getTime() - startDate.getTime();

  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));



  return (
    <div className="trip-card">
      <div className="trip-image-section">
        <img src={photos[0]} alt={name} className="trip-image" />
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
          <FaMapMarkerAlt className="icon" /> From {startlocation} to{" "}
          {destinition}
        </p>
        <p className="trip-dates">
          <FaClock className="icon" />{" "}
          {new Date(start_date).toLocaleDateString()} -{" "}
          {new Date(end_date).toLocaleDateString()} ({Difference_In_Days} days)
        </p>
        <div className="trip-footer">
          <button className="trip-button" onClick={viewTripDetails_clicked}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;





