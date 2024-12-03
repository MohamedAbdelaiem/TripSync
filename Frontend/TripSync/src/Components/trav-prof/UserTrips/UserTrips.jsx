import React, { useState } from "react";
import TripCard from "../TripsCard/TripsCard";
import "./userTrips.css";

const UserTrips = ({ trips, userID }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const userTrips = trips.filter((trip) => trip.travellerId == userID);

  const itemsPerPage = window.innerWidth <= 768 ? 1 : 3;

  const handleNext = () => {
    if (currentIndex < userTrips.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="user-trips" id="user-trips">
      <div className="header-container">
        <h2>Traveller Trips History</h2>
        <button className="total-trips-button">
          Total Trips: {userTrips.length}
        </button>
      </div>
      <div className="carousel-container">
        <button
          className="arrow-rewards left-arrow"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="trips-carousel">
          {userTrips    
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
        </div>
        <button
          className="arrow-rewards right-arrow"
          onClick={handleNext}
          disabled={currentIndex >= userTrips.length - itemsPerPage}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="dots-indicator">
        {Array.from({
          length: Math.ceil(userTrips.length / itemsPerPage),
        }).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${
              idx === Math.floor(currentIndex / itemsPerPage) ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default UserTrips;
