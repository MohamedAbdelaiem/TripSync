import React, { useState, useEffect,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import TourCardContainer from "../../Components/TourCardContainer/TourCardContainer";
import { UserContext } from "../../assets/userContext";
import { useParams } from "react-router-dom";
import "./Tours.css";


const Tours = () => {
  const [tours, setTours] = useState([]); // State to store tours data
  const [error, setError] = useState(""); // State to handle errors
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {user_id}= useParams();
  const Base_Url = "http://localhost:3000/api/v1/users/myProfile/trips/getAllTrips";

  // Fetch trips by ID
  const fetchTrips = async () => {
    // setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:3000/api/v1/trips/getTrips/${user_id}`, {
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
      const token = localStorage.getItem("token");
      console.log(id);  
      await axios.delete(`http://localhost:3000/api/v1/users/myProfile/trips/deleteTrip/${id}`,{ headers: { 
        Authorization: `Bearer ${token}`,
      },}); // Replace with your API endpoint
      setTours(tours.filter((tour) => tour.trip_id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting trip:", error);
      setError("Failed to delete trip. Please try again later.");
    }
  };

  return (
    <div className="flex">
      <SideNavBar  userId={user_id} />
      {error && <div className="error-message">{error}</div>}
      <TourCardContainer
        type={user.role} // Pass the user role
        tours={tours}
        onAddNewTour={() => navigate("/add-new-tour")}
        onDeleteTour={handleDeleteTour} // Pass the delete handler
        ID={user_id}
      />
    </div>
  );
};

export default Tours;
