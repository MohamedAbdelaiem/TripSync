import React from "react";
import PropTypes from "prop-types";
import "./TourCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const TourCard = ({
  type,
  imageSrc,
  description,
  days,
  originalPrice,
  salePrice,
  destination,
  startLocation,
  hasSale,
  onEdit,
  onBook,
  onDelete, // New prop for Delete functionality
}) => {
  return (
    <div className="tour-card">
      {hasSale ? (
        <div className="sale-image">
          <img src={imageSrc} alt={destination} />
          <div className="sale-badge">Sale</div>
        </div>
      ) : (
        <img src={imageSrc} alt={destination} />
      )}

      <div className="tour-details">
        <p>{description}</p>
        <hr />
        <h2>From: {startLocation}</h2>
        <h2>To: {destination}</h2>
        <div className="details-row">
          <FontAwesomeIcon icon={faCalendar} />
          <span> No of Days: {days}</span>
        </div>
        <div className="price-row">
          {hasSale ? (
            <>
              <span className="original-price">${originalPrice}</span>
              <span className="sale-price">${salePrice}</span>
            </>
          ) : (
            <span className="price">${originalPrice}</span>
          )}
        </div>
        <div className="action-buttons">
          {type === "traveller" ? (
            <button className="action-button" onClick={onBook}>
              Book Now
            </button>
          ) : (
            <>
              <button className="action-button" onClick={onEdit}>
                Edit
              </button>
              <button className="delete-button" onClick={onDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  type: PropTypes.string,
  imageSrc: PropTypes.string,
  description: PropTypes.string,
  days: PropTypes.number,
  originalPrice: PropTypes.number,
  salePrice: PropTypes.number,
  hasSale: PropTypes.bool,
  destination: PropTypes.string,
  startLocation: PropTypes.string,
  onEdit: PropTypes.func,
  onBook: PropTypes.func,
  onDelete: PropTypes.func, // New prop for Delete functionality
};

export default TourCard;
