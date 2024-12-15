import React, { useState } from "react";
import Reward from "../Reward/Reward";
import "./EligibleRewards.css";

const EligibleRewards = ({ rewards, userPoints,rerender }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  // Filter rewards based on user points
  const eligibleRewards = rewards.filter(
    (reward) => reward.pointsneeded <= userPoints
  );

  // Items per page (depends on screen size)
  const itemsPerPage = window.innerWidth <= 768 ? 1 : 3;

  // Handle Next and Previous
  const handleNext = () => {
    if (currentIndex < eligibleRewards.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="eligible-rewards" id="user-rewards">
      <div className="header-container">
        <h2>Eligible Rewards</h2>
        <button className="total-rewards-button">
          Total Rewards: {eligibleRewards.length}
        </button>
      </div>
      <div className="carousel-container">
        <button
          className="arrow-rewards left-arrow"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="rewards-carousel">
          {eligibleRewards
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((reward) => (
              <Reward
                key={reward.reward_id}
                id={reward.reward_id}
                photoLink={reward.photo}
                requiredPoints={reward.pointsneeded}
                description={reward.description}
                reward_claimed={false}
                rerender={rerender}
              />
            ))}
        </div>
        <button
          className="arrow-rewards right-arrow"
          onClick={handleNext}
          disabled={currentIndex >= eligibleRewards.length - itemsPerPage}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="dots-indicator">
        {Array.from({
          length: Math.ceil(eligibleRewards.length / itemsPerPage),
        }).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${
              idx === Math.floor(currentIndex / itemsPerPage) ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default EligibleRewards;
