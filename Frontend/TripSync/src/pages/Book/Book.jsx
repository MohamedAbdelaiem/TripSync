import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import axios from "axios"; // Import Axios
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { UserContext } from "../../assets/userContext";

const Book = ({ tour, onEnsureBooking }) => {
   const { user } = useContext(UserContext);
  const watcher=user.user_id;
  const [ticket, setTicket] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(null); // Error state
  const [seats, setSeats] = useState(1); // Number of seats selected (default: 1)

  const handleBooking = async () => {
    if (seats < 1 || seats > tour.maxseats) {
      setError(`Please select between 1 and ${tour.maxseats} seats.`);
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const token = localStorage.getItem("token");
 //( NumberOfSeats, Price, TRAVELLER_ID, TRIP_ID,DATE)
      const response = await axios.post(`http://localhost:3000/api/v1/users/payForTrip/${tour.trip_id}`, {
        TRIB_ID: tour.trip_id, // Assuming tour has an ID field
        TRAVELLER_ID:watcher,
        Price: (tour.sale ? tour.saleprice : tour.price) * seats, // Total price based on seats
        DATE: new Date().toISOString().split("T")[0],
        NumberOfSeats:seats, // Number of seats selected
      }, {
        headers: { Authorization: `Bearer ${token}` }
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
          {tour.photos.map((image, index) => (
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
            <FontAwesomeIcon icon={faMapMarkerAlt} /> From: {tour.startlocation} | To: {tour.destinition}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> Duration:{
            Math.ceil(
              (new Date(tour.enddate) - new Date(tour.startdate)) / (1000 * 60 * 60 * 24)
            )
          } days
          </p>
          <p>
            <FontAwesomeIcon icon={faUser} /> Max Seats: {tour.maxseats}
          </p>
        </div>

        <div className="book-page-price">
          {tour.sale ? (
            <>
              <span className="original-price">${tour.price}</span>
              <span className="sale-price">${tour.saleprice}</span>
            </>
          ) : (
            <span className="price">${tour.price}</span>
          )}
        </div>

        {/* Input for Number of Seats */}
        <div className="form-group">
          <label htmlFor="seats">Number of Seats:</label>
          <input
            type="number"
            id="seats"
            name="seats"
            min="1"
            max={tour.maxseats}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
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
                <p>
                  <strong>Seats:</strong> {seats}
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
    trip_id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxseats: PropTypes.number.isRequired,
    destinition: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    startlocation: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasSale: PropTypes.bool,
    saleprice: PropTypes.number,
  }).isRequired,
  onEnsureBooking: PropTypes.func.isRequired,
};

export default Book;
