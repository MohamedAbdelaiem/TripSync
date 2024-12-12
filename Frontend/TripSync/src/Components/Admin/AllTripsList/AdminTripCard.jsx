import React from "react";
import "./AllTripsList.css";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

function AdminTripCard({
  name,
  trip_id,
  description,
  price,
  maxseats,
  destinition,
  startlocation,
  photos,
  organizer,
  startdate,
  enddate,
  rerender,
}) {


    let current_date = new Date();

    let startDate = new Date(startdate);
    let endDate = new Date(enddate);

    const status = startDate > current_date ? "not-started" : "finished";

    let Difference_In_Time = endDate.getTime() - startDate.getTime();

    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );



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
          {startlocation || "N/A"} to {destinition || "N/A"}
        </p>
        <p className="admin-trip-dates">
          <FaClock className="admin-icon" />{" "}
          {new Date(startdate).toLocaleDateString()} -{" "}
          {new Date(enddate).toLocaleDateString()} (
          {Difference_In_Days || "N/A"} days)
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
