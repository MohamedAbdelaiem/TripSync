import React from "react";
import "./PolicyCard.css";

const PolicyCard = ({ title, description, isAdmin, onDelete,rerender }) => {
  const handleDelete = () => {
      onDelete();
  };

  return (
    <div className="policy-card-container">
      <div className="policy-card-content">
        <h2 className="policy-card-title">{title}</h2>
        <p className="policy-card-description">{description}</p>
      </div>
      {isAdmin && (
        <button className="delete-policy-card-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default PolicyCard;
