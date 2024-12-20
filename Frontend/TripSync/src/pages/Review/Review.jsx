import React, { useEffect, useState, useContext } from "react";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import ReviewCard from "../../Components/reviewCard/reviewCard";
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

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${Base_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      if (!rating || rating < 0 || rating > 5) {
        setError("Please provide a valid rating between 0 and 5.");
        return;
      }
      if (!review.trim()) {
        setError("Review content cannot be empty.");
        return;
      }
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
      fetchReviews();
    } catch (error) {
      setError("you have already reviewed this travel agency");
      console.log(review, rate, "error", error.response.data.message);
    }
  };


  const reRender = () => {
    fetchReviews();
  };

 useEffect(() => {
    if (user_id) {
      fetchReviews();
    }
  }, [user.role, user_id,review]);

  return (
    <>
      <div className="flexx">
        <SideNavBar userId={user_id}></SideNavBar>
        <div className="review-header">
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

        {(
          <div className="review-card-b">
            <h3 className="reviews-header-section">Reviews</h3>
            <section className="review-cards">
            {console.log(reviews)}
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  review={review.review}
                  rate={review.rate}
                  profilename={review.profilename}
                  profilephoto={review.profilephoto}
                  traveller_id={review.traveller_id}
                  travel_agency_id={review.travel_agency_id}
                  reRender={reRender}
                />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
            </section>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default Review;
