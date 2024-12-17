import React, { useState, useEffect } from "react";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import TravelAgencyCard from "../../Components/TravelAgencyCard/TravelAgencyCard";
import axios from "axios";
import profile from "../../assets/profile.png";
import "./AllAgencies.css";

function AllAgencies() {
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
  const handleAgencyClick = (agencyId) => {
    //console.log(agency)
    console.log(agencyId);
    navigate(`/agency-tours`, { state: { agencyId } }); // Pass the agencyId as state
  };

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
      {isLoading && <div className="loading">Loading ...</div>}
      {!isLoading && (
        <div>
          {filteredAgencies.map((Agency, index) => (
            <div
              key={index}
              onClick={() => handleAgencyClick(Agency.travelagency_id)} // Pass the agencyId to the new page
            >
              <TravelAgencyCard
                name={Agency.username}
                photo={Agency.ProfilePhoto || profile}
              />
            </div>
          ))}
          {filteredAgencies.length === 0 && (
            <p>No Agencies match your criteria.</p>
          )}
        </div>
      )}
    </>
  );
}

export default AllAgencies;
