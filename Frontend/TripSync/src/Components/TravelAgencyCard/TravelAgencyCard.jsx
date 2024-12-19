import React from "react";
import "./TravelAgencyCard.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function TravelAgencyCard({ name, photo, id }) {
  const navigate = useNavigate(); // Hook for navigation
  const handleAgencyClick = (agencyId) => {
    //console.log(agency)

    console.log(agencyId);
    navigate(`/travel-agency/${agencyId}`); // Pass the agencyId as state
  };
  return (
    <>
      <div className="containerAgency" onClick={() => handleAgencyClick(id)}>
        <img src={photo} alt={`${name} logo`} className="imgAgency" />
        <h2 className="nameAgency">{name}</h2>
      </div>
    </>
  );
}

export default TravelAgencyCard;
