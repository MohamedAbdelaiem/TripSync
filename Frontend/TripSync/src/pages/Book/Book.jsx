import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import axios from "axios"; // Import Axios
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Book = ({ tour, onEnsureBooking }) => {
  const [ticket, setTicket] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(null); // Error state

  const handleBooking = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const travellerID = localStorage.getItem("travellerID"); // Fetch TravellerID from storage or backend
      const response = await axios.post("http://localhost:3000/api/tickets", {
        tourID: tour.id, // Assuming tour has an ID field
        travellerID,
        price: tour.hasSale ? tour.salePrice : tour.price,
        purchaseDate: new Date().toISOString().split("T")[0],
      });

      setTicket(response.data); // Store the ticket details from the response
      setBookingConfirmed(true); // Confirm booking
      console.log("Ticket Created:", response.data);
      onEnsureBooking(); // Trigger parent callback if necessary
    } catch (err) {
      console.error("Error creating ticket:", err);
      setError("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <button className="slick-prev" aria-label="Previous Slide" />,
    nextArrow: <button className="slick-next" aria-label="Next Slide" />,
  };

  return (
    <div className="book-page-container">
      <div className="book-page-slider">
        <Slider {...settings}>
          {tour.images.map((image, index) => (
            <div key={index} className="book-page-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="book-page-details">
        <h2>{tour.description}</h2>
        <div className="book-page-info">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> From: {tour.startLocation} | To: {tour.destination}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> Duration: {tour.duration} days
          </p>
          <p>
            <FontAwesomeIcon icon={faUser} /> Max Seats: {tour.maxSeats}
          </p>
        </div>

        <div className="book-page-price">
          {tour.hasSale ? (
            <>
              <span className="original-price">${tour.price}</span>
              <span className="sale-price">${tour.salePrice}</span>
            </>
          ) : (
            <span className="price">${tour.price}</span>
          )}
        </div>

        <button
          className="book-now-button"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? "Processing..." : "Ensure Booking"}
        </button>

        {error && <p className="error">{error}</p>}

        {bookingConfirmed && (
          <div className="booking-confirmation">
            <h3>Booking Confirmed! Your ticket has been created successfully.</h3>

            {ticket && (
              <div className="ticket-details">
                <h4>Ticket Details:</h4>
                <p>
                  <strong>Ticket ID:</strong> {ticket.TicketID}
                </p>
                <p>
                  <strong>Purchase Date:</strong> {ticket.PurchaseDate}
                </p>
                <p>
                  <strong>Price:</strong> ${ticket.Price}
                </p>
                <p>
                  <strong>Trip ID:</strong> {ticket.TripID}
                </p>
                <p>
                  <strong>Traveller ID:</strong> {ticket.TravellerID}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Book.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming tour has an ID
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxSeats: PropTypes.number.isRequired,
    destination: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    startLocation: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasSale: PropTypes.bool,
    salePrice: PropTypes.number,
  }).isRequired,
  onEnsureBooking: PropTypes.func.isRequired,
};

export default Book;
