import React from "react";
import "./Reward.css"
import { useState } from "react";

const Reward = ({ id, photoLink, requiredPoints, description, reward_claimed }) => {
  const [claimed, setClaimed] = useState(reward_claimed); 

  const handleClaim = () => {
    setClaimed(true); 
  };

  return (
    <div className="reward-card">
      <div className="reward-image-container">
        <img src={photoLink} alt="Reward" className="reward-image" />
      </div>
      <div className="reward-content">
        <h3 className="reward-description">{description}</h3>
        <p className="reward-points">✨ Requires: {requiredPoints} Points</p>
        <button
          className={`claim-btn ${claimed ? "claimed" : ""}`}
          onClick={handleClaim}
          disabled={claimed} // Disable button after claiming
        >
          {claimed ? "Claimed 🎉" : "🎁 Claim Reward"}
        </button>
      </div>
    </div>
  );
};

export default Reward;
