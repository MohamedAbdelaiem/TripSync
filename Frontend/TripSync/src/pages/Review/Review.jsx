import React from "react";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import "./Review.css";
import { useState } from "react";
import StarProgress from "../../Components/StarProgress/StarProgress";
import { useLocation } from "react-router-dom";
import axios  from "axios";
function Review() {
  const [rating, setRating] = useState(3); // Example rating value (3 out of 5)

  const handleInputChange = (event) => {
    const newRating = Math.min(Math.max(Number(event.target.value), 0), 5);
    setRating(newRating);
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' valu
  const Base_URL =
    "http://localhost:3000/api/v1/users/73/reviews/reviews/makeReview";
  const [review, setReview] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        Base_URL,
        {
          review,
          rate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
      console.log("error", error.response.data.message);
    }
  };
  return (
    <>
      <div className="flexx">
        <SideNavBar type={userType}></SideNavBar>

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
                  // onChange={(e)=>setRate(e.currentTarget.value)}
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
                onChange={(e)=>setReview(e.currentTarget.value)}
              ></textarea>
            </div>
            <button className="sendBtn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
