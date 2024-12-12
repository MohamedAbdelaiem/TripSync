import React from "react";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import { useState, useEffect } from "react";
import TravelAgencyCard from "../../Components/TravelAgencyCard/TravelAgencyCard";
import axios from "axios";
import profile from "../../assets/profile.png";
import "./AllAgencies.css";

function AllAgencies() {
  const [Agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(response.data);
      // setAgency(response.data.data);
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

  console.log(filteredAgencies);
  return (
    <>
      <NavbarSignedIn />
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search For Agencies . . ."
          data-search
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading && <div className="loading">Loading ...</div>}
      {!isLoading && (
        <div>
          {filteredAgencies.map((Agency, index) => (
            <TravelAgencyCard
              key={index}
              name={Agency.username}
              photo={Agency.ProfilePhoto || profile}
            />
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
