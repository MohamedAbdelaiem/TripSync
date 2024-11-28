
//import React from 'react';
import PropTypes from 'prop-types';
import './TourCard.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const TourCard = ({ imageSrc, title, description, days,originalPrice, salePrice, hasSale, detailsLink }) => {
  return (
    <div className="tour-card">

     {hasSale ? (
            <>
             <div className='sale-image'>
             <img src={imageSrc} alt={title} /> 
             <div className="sale-badge">Sale</div>
             </div>
            
              
            </>
          ) : (
            <img src={imageSrc} alt={title} />
          )}


     
      <div className="tour-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <hr></hr>
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
          <a href={detailsLink} className="view-details"><button >Book Now</button></a>
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
    originalPrice: PropTypes.number,
    salePrice:PropTypes.number,
    hasSale: PropTypes.bool,
    detailsLink:PropTypes.string
  };

export default TourCard;