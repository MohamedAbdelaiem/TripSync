import React from "react";
import "./PolicyCard.css";

function PolicyCard({ title, description }) {
  return (
    <>
      <div className="policy-card-container">
        <div className="policy-card-content">
          <h2 className="policy-card-title">{title}</h2>
          <p className="policy-card-description">{description}</p>
        </div>
      </div>
    </>
  );
}

export default PolicyCard;
