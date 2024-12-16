import React from "react";
import "./AllTribsPublic.css";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PublicTrips({
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

  const navigate = useNavigate();
  const go_to_trip_details = () => {
    navigate(`/trip-details/${trip_id}`)
  }

    let current_date = new Date();

    let startDate = new Date(startdate);
    let endDate = new Date(enddate);

    if(startDate<current_date)
    {
        return null;
    }
    const status = startDate > current_date ? "not-started" : "finished";

    let Difference_In_Time = endDate.getTime() - startDate.getTime();

    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );




  const viewTripDetails_clicked = () => {
    console.log(`View details for trip ID: ${trip_id}`);
  };

  return (
    <div className="public-trip-card">
      <div className="public-trip-image-section">
        <img
          src={
            photos && photos[0] ? photos[0] : "https://via.placeholder.com/150"
          }
          alt={name || "Trip Image"}
          className="public-trip-image"
        />
      </div>
      <div className="public-trip-info-section">
        <div className="public-trip-header">
          <h2 className="public-trip-name">{name || "Unnamed Trip"}</h2>
          {status === "not-started" && (
            <div className="public-trip-status not-started">Not started</div>
          )}
          {status === "finished" && (
            <div className="public-trip-status finished">Finished</div>
          )}
        </div>
        <p className="public-trip-organizer">
          Organized by: {organizer || "Unknown"}
        </p>
        <p className="public-trip-locations">
          <FaMapMarkerAlt className="public-icon" /> From{" "}
          {startlocation || "N/A"} to {destinition || "N/A"}
        </p>
        <p className="public-trip-dates">
          <FaClock className="public-icon" />{" "}
          {new Date(startdate).toLocaleDateString()} -{" "}
          {new Date(enddate).toLocaleDateString()} (
          {Difference_In_Days || "N/A"} days)
        </p>
        <div className="public-trip-footer">
          <button
            className="public-trip-button"
            onClick={go_to_trip_details}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicTrips;
