
//import React from 'react';
import PropTypes from 'prop-types';
import './TourCard.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const TourCard = ({ imageSrc, title, description, days, price, detailsLink }) => {
  return (
    <div className="tour-card">
      <img src={imageSrc} alt={title} />
      <div className="tour-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <hr></hr>
        <div className="details-row">
        <FontAwesomeIcon icon={faCalendar} />
        <span> No of Days: {days}</span>
        </div>
        <div className="price-row">
          <span>${price}</span>
          <a href={detailsLink} className="view-details"><button >View Details</button></a>
        </div>
      </div>
    </div>
  );
};
TourCard.propTypes = {
    imageSrc: PropTypes.string,
    title:PropTypes.string,
    description: PropTypes.string,
    days: PropTypes.number,
    price: PropTypes.number,
    detailsLink:PropTypes.string
  };

export default TourCard;