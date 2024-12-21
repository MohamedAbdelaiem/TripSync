import React from "react";
import "./Reward.css";
import axios from "axios";
import { useState } from "react";

const Reward = ({
  id,
  photoLink,
  requiredPoints,
  description,
  reward_claimed,
  rerender,
  showPopUp,
}) => {
  const [claimed, setClaimed] = useState(reward_claimed);

  const token = localStorage.getItem("token");
  const RedeemReward = async () => {
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/rewards/RedeemReward/${id}`,
        {}, // Assuming no request body is needed. If there is, pass it here
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      showPopUp("Reward Calimes Successfully","success");
      setTimeout(() => {
        rerender();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaim = () => {
    // setTimeout(() => { RedeemReward() }, 1000);

    RedeemReward();
    setClaimed(!claimed);
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
