import React from "react";
import "./StarProgress.css";
import PropTypes from "prop-types";
const StarProgress = ({ rating }) => {
  const totalStars = 5; // Total number of stars

  return (
    <div className="star-container">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
};
StarProgress.propTypes = {
  rating: PropTypes.string,
  className:PropTypes.string,
};
export default StarProgress;
