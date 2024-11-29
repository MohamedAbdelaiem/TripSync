import React from "react";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./Review.css";
import { useState } from "react";
import StarProgress from "../../Components/StarProgress/StarProgress";
function Review() {
  const [rating, setRating] = useState(3); // Example rating value (3 out of 5)

  const handleInputChange = (event) => {
    const newRating = Math.min(Math.max(Number(event.target.value), 0), 5);
    setRating(newRating);
  };

  return (
    <>
      <div className="nvbar">
        {" "}
        <NavbarSignedInner />
      </div>

      <div className="cardReview ">
        <div className="card-body">
          <div className="titleReview h4 ">
            Let us Know about what you think
          </div>
          Rate us!
          <div className="progress">
            <StarProgress rating={rating} />
          </div>
          <div>
            <label className="rateNum">
              Set Rating (0-5):
              <input
                className="stars"
                type="number"
                value={rating}
                onChange={handleInputChange}
                min="0"
                max="5"
              />
            </label>
          </div>
          <div className="ReviewContent">
            <textarea
              type="text"
              placeholder="Your review"
              className="input-review"
            ></textarea>
          </div>
          <button className="sendBtn">Submit</button>
        </div>
      </div>
    </>
  );
}

export default Review;
