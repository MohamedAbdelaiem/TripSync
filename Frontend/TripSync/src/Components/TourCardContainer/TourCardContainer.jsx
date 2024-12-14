import React from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../TourCard/TourCard";
import "./TourCardContainer.css";

const TourCardContainer = ({ type, tours, onAddNewTour, onDeleteTour }) => {
  const navigate = useNavigate();

  const handleBook = (tour) => {
    console.log("Navigating to Book Page with tour:", tour);
    navigate("/book", { state: { tour } }); // Pass selected tour to Book page
  };

  const handleEdit = (tour) => {
    navigate("/edit-tour", { state: { tour } }); // Pass selected tour to Edit page
  };
  const handleDelete = (tourId) => {
    console.log("Deleting tour with ID:", tourId);
    onDeleteTour(tourId); // Call the delete function passed as a prop
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
          {(tours.length > 0) ? (
      tours.map((tour, index) => (
        <TourCard
          key={tour.id || index}  // Use unique id if possible, else fallback to index
          type={type}
          imageSrc={tour.images && tour.images.length > 0 ? tour.images[0] : 'defaultImage.jpg'}  // Check if images exists
          description={tour.description}
          days={tour.duration}
          originalPrice={tour.price}
          destination={tour.destination}
          startLocation={tour.startLocation}
          hasSale={tour.hasSale}
          salePrice={tour.salePrice}
          onBook={() => handleBook(tour)} // Pass the entire tour object
          onEdit={() => handleEdit(tour)}
          onDelete={() => handleDelete(tour.id)}
        />
      ))
    ) : (
      <h1>No Tours Available</h1>
    )}

      </div>
    </div>
  );
};

export default TourCardContainer;
