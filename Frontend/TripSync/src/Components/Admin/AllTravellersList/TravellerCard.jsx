import React from "react";
import "./AllTravellersList.css";

function TravellerCard({ image_url, id, prof_name }) {
  const onViewProfile = () => {};
  const onBlockUser = () => {};
  return (
    <div className="traveller-card-container">
        <img src={image_url} alt={prof_name} className="traveller-card-photo" />
        <h3 className="traveller-card-name">{prof_name}</h3>
      <div className="travellr-card-info">
        <div className="traveller-card-actions">
          <button
            className="view-traveller-card-profile-btn"
            onClick={onViewProfile}
          >
            View Profile
          </button>
          <button
            className="block-traveller-card-user-btn"
            onClick={onBlockUser}
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravellerCard;
