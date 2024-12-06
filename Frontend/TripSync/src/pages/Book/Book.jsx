import React from "react";
import PropTypes from "prop-types";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Book = ({ tour }) => {
  if (!tour) {
    return <div>No tour selected. Please go back and select a tour.</div>;
  }

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

        <button className="book-now-button">Ensure Booking</button>
      </div>
    </div>
  );
};

Book.propTypes = {
  tour: PropTypes.shape({
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxSeats: PropTypes.number.isRequired,
    destination: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    startLocation: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasSale: PropTypes.bool,
    salePrice: PropTypes.number,
  }),
};

export default Book;
