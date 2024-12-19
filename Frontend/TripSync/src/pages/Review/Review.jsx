import React, { useEffect, useState, useContext } from "react";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import "./Review.css";
import StarProgress from "../../Components/StarProgress/StarProgress";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../assets/userContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Review() {
  const [rating, setRating] = useState(3); // Example rating value (3 out of 5)
  const [review, setReview] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]); // State to hold fetched reviews
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { user_id } = useParams();

  const Base_URL = `http://localhost:3000/api/v1/users/${user_id}/reviews/reviews`; // Dynamically use the userId in the URL

  const handleInputChange = (event) => {
    const newRating = Math.min(Math.max(Number(event.target.value), 0), 5);
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${Base_URL}/makeReview`,
        {
          review,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
      console.log(review, rate, "error", error.response.data.message);
    }
  };

  useEffect(() => {
    // Fetch reviews only if the userType is travel_agency
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    if (user.role === "travel_agency" && user_id) {
      fetchReviews();
    }
  }, [user.role, user_id]);

  return (
    <>
      <div className="flexx">
        <SideNavBar userId={user_id}></SideNavBar>

        {user.role === "traveller" && (
          <div className="cardReview">
            <div className="card-body">
              <div className="titleReview h4">
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
                    onChange={(e) => {
                      handleInputChange(e);
                      setRate(e.currentTarget.value);
                    }}
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
                  onChange={(e) => setReview(e.currentTarget.value)}
                ></textarea>
              </div>
              <button className="sendBtn" onClick={handleSubmit}>
                Submit
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </div>
          </div>
        )}

        {user.role === "travel_agency"&&(
          <div className="reviews-container">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <p>
                    <strong>Rating:</strong> {review.rating} / 5
                  </p>
                  <p>
                    <strong>Review:</strong> {review.review}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Review;
