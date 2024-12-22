import React from "react";
import "./AdminReward.css";
import { useState } from "react";

const AdminReward = ({
  id,
  photoLink,
  requiredPoints,
  description,
    reward_claimed,
  DeleteReward,
  rerender
}) => {
  const [claimed, setClaimed] = useState(reward_claimed);

  const handleDelete = (e) => {
      id = e.target.key
  };

  return (
    <div className="admin-reward-card">
      <div className="admin-reward-image-container">
        <img
          src={photoLink}
          alt="admin-Reward"
          className="admin-reward-image"
        />
      </div>
      <div className="admin-reward-content">
        <h3 className="admin-reward-description">{description}</h3>
        <p className="admin-reward-points">
          ✨ Requires: {requiredPoints} Points
        </p>
        <button
          className="Delete-admin-reward-button"
          onClick={()=>{DeleteReward(id)}}
        >
          Delete Reward
        </button>
      </div>
    </div>
  );
};

export default AdminReward;
