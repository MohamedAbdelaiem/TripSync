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
  const agencyId = location.state||{};
console.log(agencyId);
  // Fetch tours for the selected agency
  useEffect(() => {
    const fetchTours = async () => {
      if (agencyId) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3000/api/v1/trips/getTrips/${agencyId}`,{headers: { 
              Authorization: `Bearer ${token}`,
            },}
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
        {tours.map((tour) => {
  // JavaScript logic for calculating days
  const startDate = new Date(tour.startdate);
  const endDate = new Date(tour.enddate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Difference in days

  return (
    <TourCard
      key={tour.trip_id}
      type="traveller" // We are only dealing with the traveler type here
      imageSrc={tour.photos[0]}
      description={tour.description}
      days={days} // Pass the calculated days
      originalPrice={tour.price}
      salePrice={tour.saleprice}
      destination={tour.destination}
      startLocation={tour.startlocation}
      hasSale={tour.sale}
      onBook={() => handleBookTour(tour.user_id)} // Handle booking for traveler
    />
  );
})}

      </div>
    </div>
  );
};

export default AgencyToursPage;
