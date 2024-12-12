import React from "react";
import "./AllTripsList.css";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

function AdminTripCard({
  trip_id,
  photos,
  name,
  organizer,
  startLocation,
  destinition,
  startDate,
  endDate,
  duration,
  status,
  rerender,
}) {
  const viewTripDetails_clicked = () => {
    console.log(`View details for trip ID: ${trip_id}`);
  };

  return (
    <div className="admin-trip-card">
      <div className="admin-trip-image-section">
        <img
          src={
            photos && photos[0] ? photos[0] : "https://via.placeholder.com/150"
          }
          alt={name || "Trip Image"}
          className="admin-trip-image"
        />
      </div>
      <div className="admin-trip-info-section">
        <div className="admin-trip-header">
          <h2 className="admin-trip-name">{name || "Unnamed Trip"}</h2>
          {status === "not-started" && (
            <div className="trip-status not-started">Not started</div>
          )}
          {status === "finished" && (
            <div className="trip-status finished">Finished</div>
          )}
        </div>
        <p className="admin-trip-organizer">
          Organized by: {organizer || "Unknown"}
        </p>
        <p className="admin-trip-locations">
          <FaMapMarkerAlt className="admin-icon" /> From{" "}
          {startLocation || "N/A"} to {destinition || "N/A"}
        </p>
        <p className="admin-trip-dates">
          <FaClock className="admin-icon" />{" "}
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()} ({duration || "N/A"} days)
        </p>
        <div className="admin-trip-footer">
          <button
            className="admin-trip-button"
            onClick={viewTripDetails_clicked}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminTripCard;
