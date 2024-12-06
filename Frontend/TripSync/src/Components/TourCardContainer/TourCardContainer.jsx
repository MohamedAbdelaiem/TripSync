import React from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../TourCard/TourCard";
import "./TourCardContainer.css";

const TourCardContainer = ({ type, tours, onAddNewTour }) => {
  const navigate = useNavigate();

  const handleBook = (tour) => {
    console.log("Navigating to Book Page with tour:", tour);
    navigate("/book", { state: { tour } }); // Pass selected tour to Book page
  };

  const handleEdit = (tour) => {
    navigate("/edit-tour", { state: { tour } }); // Pass selected tour to Edit page
  };

  return (
    <div className="containr">
      <div className="add-tour-button-container">
        {type === "travel_agency" && (
          <button className="add-tour-button" onClick={onAddNewTour}>
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
            onBook={() => handleBook(tour)} // Pass the entire tour object
            onEdit={() => handleEdit(tour)}
          />
        ))}
      </div>
    </div>
  );
};

export default TourCardContainer;
