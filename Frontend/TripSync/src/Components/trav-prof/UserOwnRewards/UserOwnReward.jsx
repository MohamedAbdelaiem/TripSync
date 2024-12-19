import React from "react";
import "./UserOwnReward.css";

const UserOwnReward = ({ rewardName, rewardPoints, rewardImage }) => {
  return (
    <div className="reward-card">
      <img src={rewardImage} alt={rewardName} className="reward-image" />
      <div className="reward-details">
        <h2 className="reward-name">{rewardName}</h2>
        <p className="reward-points">Points: {rewardPoints}</p>
      </div>
    </div>
  );
};

export default UserOwnRewards;
