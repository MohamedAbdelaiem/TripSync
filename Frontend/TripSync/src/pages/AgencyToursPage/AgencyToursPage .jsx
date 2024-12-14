import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TourCard from "../../Components/TourCard/TourCard";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import "./AgencyToursPage.css";

const AgencyToursPage = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation(); // Get the location to access state
  const navigate = useNavigate();

  // Access agencyId from location state
  const agencyId = location.state?.agencyId;

  // Fetch tours for the selected agency
  useEffect(() => {
    const fetchTours = async () => {
      if (agencyId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/tours?agencyId=${agencyId}`
          );
          setTours(response.data); // Assuming the API returns a list of tours
        } catch (error) {
          console.error("Error fetching tours:", error);
          setError("Failed to load tours. Please try again later.");
        }
      }
    };

    fetchTours();
  }, [agencyId]);

  const handleBookTour = (tourId) => {
    // Redirect to the booking page or handle booking logic
    navigate(`/book-tour?id=${tourId}`);
  };

  return (
    <div className="agency-tours-page">
      <h1>Agency Tours</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="tour-cards">
        {tours.length === 0 && <p>No tours available for this agency.</p>}
        {tours.map((tour) => (
          <TourCard
            key={tour._id}
            type="traveller" // We are only dealing with the traveler type here
            imageSrc={tour.imageSrc}
            description={tour.description}
            days={tour.days}
            originalPrice={tour.originalPrice}
            salePrice={tour.salePrice}
            destination={tour.destination}
            startLocation={tour.startLocation}
            hasSale={tour.hasSale}
            onBook={() => handleBookTour(tour._id)} // Handle booking for traveler
          />
        ))}
      </div>
    </div>
  );
};

export default AgencyToursPage;
