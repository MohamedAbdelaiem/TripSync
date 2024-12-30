import React, { useState, useEffect } from "react";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import TravelAgencyCard from "../../Components/TravelAgencyCard/TravelAgencyCard";
import axios from "axios";
import profile from "../../assets/profile.png";
import "./AllAgencies.css";
import { useContext } from "react";
import { UserContext } from "../../assets/userContext";

function AllAgencies() {
  const { user } = useContext(UserContext);
  const watcher = user.user_id;
  const [Agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const Base_URL = `http://localhost:3000/api/v1/users/getAllTravelAgencies`;

  // Fetch data from the database
  const fetchAgency = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(Base_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgencies(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgency();
  }, []);

  // Filtering logic
  const filteredAgencies = Agencies.filter((Agency) => {
    const matchesSearch = Agency.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Navigate to the tours page for a specific agency


  return (
    <>
      <NavbarSignedIn />
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search For Agencies . . ."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Please Wait...</p>
        </div>
      )}
      {!isLoading && (
        <div>
          {filteredAgencies.map((Agency, index) => (
            <div key={index}>
              <TravelAgencyCard
                name={Agency.username}
                photo={Agency.profilephoto || profile}
                id={Agency.travelagency_id}
              />
            </div>
          ))}
          {filteredAgencies.length === 0 && (
            <p className="Nosearch">No Agencies match your criteria.</p>
          )}
        </div>
      )}

    </>
  );
}

export default AllAgencies;
