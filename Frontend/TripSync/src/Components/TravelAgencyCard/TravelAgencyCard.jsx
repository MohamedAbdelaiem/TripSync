import React from "react";
import "./TravelAgencyCard.css";

function TravelAgencyCard({ name, photo }) {
  return (
    <>
      <div className="containerAgency">
        <img src={photo} alt={`${name} logo`} className="imgAgency" />
        <h2 className="nameAgency">{name}</h2>
      </div>
    </>
  );
}

export default TravelAgencyCard;
