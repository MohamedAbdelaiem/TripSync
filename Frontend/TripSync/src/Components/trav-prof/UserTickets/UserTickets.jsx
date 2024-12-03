import React, { useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import "./UserTickets.css";

const UserTickets = ({ tickets, userID }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const userTickets = tickets.filter((ticket) => ticket.travellerId == userID);

  const itemsPerPage = window.innerWidth <= 768 ? 1 : 3;

  const handleNext = () => {
    if (currentIndex < userTickets.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="user-tickets" id="user-tickets">
      <div className="header-container">
        <h2>Traveller Tickets</h2>
        <button className="total-tickets-button">
          Total Tickets: {userTickets.length}
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

        <div className="tickets-carousel">
          {userTickets
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((ticket) => (<TicketCard key={ticket.id} ticket={ticket} />) )}
        </div>
        <button
          className="arrow-rewards right-arrow"
          onClick={handleNext}
          disabled={currentIndex >= userTickets.length - itemsPerPage}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="dots-indicator">
        {Array.from({
          length: Math.ceil(userTickets.length / itemsPerPage),
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

export default UserTickets;
