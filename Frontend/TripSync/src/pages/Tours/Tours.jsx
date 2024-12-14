import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import TourCardContainer from "../../Components/TourCardContainer/TourCardContainer";
import "./Tours.css";

const Tours = () => {
  const [tours, setTours] = useState([]); // State to store tours data
  const [error, setError] = useState(""); // State to handle errors
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type");
  const userId = queryParams.get("id"); // Assuming you pass the user ID as a query parameter

  // Fetch trips by ID
  useEffect(() => {
    const fetchTripsById = async () => {
      try {
        // Replace with your API endpoint for fetching trips by ID
        const response = await axios.get(
          `https://your-api-endpoint/trips?userId=${userId}`
        );
        setTours(response.data); // Assuming the API returns an array of trips
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError("Failed to load trips. Please try again later.");
      }
    };

    if (userId) {
      fetchTripsById();
    }
  }, [userId]); // Re-fetch trips when userId changes

  // Handle delete tour
  const handleDeleteTour = async (id) => {
    try {
      await axios.delete(`https://your-api-endpoint/trips/${id}`); // Replace with your API endpoint
      setTours(tours.filter((tour) => tour.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting trip:", error);
      setError("Failed to delete trip. Please try again later.");
    }
  };

  return (
    <div className="flex">
      <SideNavBar type={userType} userId={userId} />
      {error && <div className="error-message">{error}</div>}
      <TourCardContainer
        type={userType}
        tours={tours}
        onAddNewTour={() => navigate("/add-new-tour")}
        onDeleteTour={handleDeleteTour} // Pass the delete handler
      />
    </div>
  );
};

export default Tours;
