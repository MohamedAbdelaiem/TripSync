import React from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../TourCard/TourCard";
import "./TourCardContainer.css";

const TourCardContainer = ({ type, tours }) => {
  const navigate = useNavigate();

  const handleAddNewTour = () => {
    navigate("/add-new-tour", { state: { type } });
  };

  return (
    <div className="containr">
  <div className="add-tour-button-container">
      {type === "travel_agency" && (
        
          <button className="add-tour-button" onClick={handleAddNewTour}>
            Add New Tour
          </button>
     
      )}
      </div>
<div className="tour-card-container">
      {tours.map((tour, index) => (
        <TourCard
          key={index}
          type={type}
          imageSrc={tour.images[0]} 
          description={tour.description}
          days={tour.duration}
          originalPrice={tour.price}
          destination={tour.destination}
          startLocation={tour.startLocation}
          hasSale={tour.hasSale}     
          salePrice={tour.salePrice}
        />
      ))}
    </div>
    </div>
  );
};

export default TourCardContainer;
