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
  const Base_Url = "http://localhost:3000/api/v1/users/myProfile/trips/getAllTrips";

  // Fetch trips by ID
  const fetchTrips = async () => {
    // setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(Base_Url, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // setTrips(response.data.data);
      setTours(response.data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);


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
