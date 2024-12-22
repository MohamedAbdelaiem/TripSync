import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../../assets/userContext";

const Book = ({ tour, onEnsureBooking }) => {
  const { user } = useContext(UserContext);
  const watcher = user.user_id;

  const [ticket, setTicket] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState(1);
  const [availbleSeats, setAvailbleSeats] = useState(0);
  const [myRewards, setMyRewards] = useState([]);
  const [myPromotions, setMyPromotions] = useState([]);
  const [myFreeTrips, setMyFreeTrips] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [selectedFreeTrip, setSelectedFreeTrip] = useState("");

  const getAvailbleSeats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/trips/getAvailbleSeats/${tour.trip_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailbleSeats(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const RedeemReward = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/v1/rewards/deleteFromMyRewards/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      if (seats < 1 || seats > availbleSeats) {
        setError(`Please select between 1 and ${availbleSeats} seats.`);
        return;
      }
      if ((selectedFreeTrip && selectedFreeTrip.reward_id) && (selectedPromotion && selectedPromotion.reward_id)) {
        alert("You can only select one reward at a time.");
        return;
      }
      console.log(selectedFreeTrip);
      let actualPrice=(!tour.sale)?tour.price:tour.saleprice;
      if(selectedFreeTrip.reward_id)
      {
        await RedeemReward(selectedFreeTrip.reward_id);
        actualPrice=0;
      }
      else if(selectedPromotion.reward_id)
      {
        await RedeemReward(selectedPromotion.reward_id);
        actualPrice=actualPrice-actualPrice*selectedPromotion.promotionpercentage/100;
      }
      const token = localStorage.getItem("token");
      console.log(actualPrice);
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/payForTrip/${tour.trip_id}`,
        {
          Price: actualPrice*seats,
          NumberOfSeats: seats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setBookingConfirmed(true);
      onEnsureBooking();
      //navigate(`/traveller-profile/${watcher}`);
    } catch (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
    }
  };

  const fetchMyRewards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/rewards/myRewards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length !== 0) {
        const promotions = response.data.filter((reward) => reward.type === "promotion");
        setMyPromotions(promotions);
        const freeTrips = response.data.filter((reward) => reward.type === "free trip");
        setMyFreeTrips(freeTrips);
      }
      setMyRewards(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  useEffect(() => {
    fetchMyRewards();
    getAvailbleSeats();
  }, []);
  console.log(myPromotions)
  console.log(myFreeTrips)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <button className="slick-prev" aria-label="Previous Slide" />,
    nextArrow: <button className="slick-next" aria-label="Next Slide" />,
  };

  return (
    <div className="book-page-container">
      <div className="book-page-slider">
        <Slider {...settings}>
          {tour.photos.map((image, index) => (
            <div key={index} className="book-page-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="book-page-details">
        <h2>{tour.description}</h2>
        <div className="book-page-info">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> From: {tour.startlocation} | To: {tour.destinition}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> Start Date:{" "}
            
            { new Date(tour.startdate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
     
           
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> End Date:{" "}
            
              { new Date(tour.enddate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
           
          </p>
          
          <p>
            <FontAwesomeIcon icon={faUser} /> Available Seats: {availbleSeats}
          </p>
        </div>

        <div className="book-page-price">
          {tour.sale ? (
            <>
              <span className="original-price">${tour.price}</span>
              <span className="sale-price">${tour.saleprice}</span>
            </>
          ) : (
            <span className="price">${tour.price}</span>
          )}
        </div>

        {/* Input for Number of Seats */}
        <div className="form-group">
          <label htmlFor="seats">Number of Seats:</label>
          <input
            type="number"
            id="seats"
            name="seats"
            min="1"
            max={tour.maxseats}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
        </div>
    
       {/* Promotions Dropdown */}
{myPromotions.length > 0 && (
  <div className="form-group">
    <label htmlFor="promotions">Choose a Promotion:</label>
    <select
      id="promotions"
      value={selectedPromotion?.reward_id || ""} // Bind to reward_id
      onChange={(e) => {
        const selected = myPromotions.find(
          (promotion) => promotion.reward_id == e.target.value
        );
        setSelectedPromotion(selected || {});
      }}
    >
      <option value="">None</option>
      {myPromotions.map((promo) => (
        <option key={promo.reward_id} value={promo.reward_id}>
          {promo.description}
        </option>
      ))}
    </select>
  </div>
)}


    {/* Free Trips Dropdown */}
{myFreeTrips.length > 0 && (
  <div className="form-group">
    <label htmlFor="free-trips">Choose a Free Trip:</label>
    <select
      id="free-trips"
      value={selectedFreeTrip?.reward_id || ""} // Bind to reward_id
      onChange={(e) => {
        const selected = myFreeTrips.find(
          (freeTrip) => freeTrip.reward_id == e.target.value
        );
        setSelectedFreeTrip(selected || {});
      }}
    >
      <option value="">None</option>
      {myFreeTrips.map((trip) => (
        <option key={trip.reward_id} value={trip.reward_id}>
          {trip.description}
        </option>
      ))}
    </select>
  </div>
)}

        <button
          className="book-now-button"
          onClick={handleBook}
          disabled={loading}
        >
          {loading ? "Processing..." : "Ensure Booking"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

Book.propTypes = {
  tour: PropTypes.shape({
    trip_id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxseats: PropTypes.number.isRequired,
    destinition: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    startlocation: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasSale: PropTypes.bool,
    saleprice: PropTypes.number,
  }).isRequired,
  onEnsureBooking: PropTypes.func.isRequired,
};

export default Book;
