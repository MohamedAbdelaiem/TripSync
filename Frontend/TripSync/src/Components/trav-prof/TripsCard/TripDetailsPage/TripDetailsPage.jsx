import React, { useEffect, useState, useContext } from "react";
import { Calendar, MapPin, Users, User, DollarSign } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { UserContext } from "../../../../assets/userContext";
import axios from "axios";
import "./TripDetailsPage.css";

const TripDetailsPage = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [tripData, setTripData] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [selectedPromotion, setSelectedPromotion] = useState({});
  const [selectedFreeTrip, setSelectedFreeTrip] = useState({});
  const [myRewards, setMyRewards] = useState([]);
  const [myPromotions, setMyPromotions] = useState([]);
  const [myFreeTrips, setMyFreeTrips] = useState([]);
  const [availbleSeats, setAvailbleSeats] = useState(0);
  const { user } = useContext(UserContext);


  const navigate = useNavigate();
  const { trip_id } = useParams();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const {
    name,
    description,
    price,
    sale,
    maxseats,
    destinition,
    startlocation,
    photos,
    organizer_id,
    organizer_name,
    start_date,
    end_date,
    saleprice
  } = tripData;

  const getTripData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/trips/getTripByID/${trip_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTripData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAvailbleSeats = async () => {
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/trips/getAvailbleSeats/${trip_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setAvailbleSeats(response.data.data);
    }
    catch(error){
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
      if ((selectedFreeTrip && selectedFreeTrip.reward_id) && (selectedPromotion && selectedPromotion.reward_id)) {
        alert("You can only select one reward at a time.");
        togglePoppUp("You can only select one reward at a time.", "fail");
        setTimeout(() => {
          setShowPopup(false);
          return;
        }, 2000);
      }
      console.log(selectedFreeTrip);
      let actualPrice=(sale)?saleprice:price;
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
        `http://localhost:3000/api/v1/users/payForTrip/${trip_id}`,
        {
          Price: actualPrice*numberOfSeats,
          NumberOfSeats: numberOfSeats
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      // alert("Booking successful!");
      togglePoppUp("Booking successful!", "success");
      setTimeout(() => {
        setShowBookingForm(false);
        navigate(`/traveller-profile/${user.user_id}`);
      }, 2000);

    } catch (error) {
      console.error(error);
      togglePoppUp("Booking failed. Please check try again.", "fail");
      setTimeout(() => {
        setShowPopup(false);
        return;
      }, 2000);
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
      console.log(response.data);
      if (response.data.length !== 0) {
        const promotions = response.data.filter((reward) => reward.type === "promotion");
        setMyPromotions(promotions);
        console.log(promotions)
        const freeTrips = response.data.filter((reward) => reward.type === "free trip");
        setMyFreeTrips(freeTrips);
      }
      setMyRewards(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % (photos?.length || 1));
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? (photos?.length || 1) - 1 : prev - 1
    );
  };

  useEffect(() => {
    getTripData();
    fetchMyRewards();
    getAvailbleSeats();
  }, []);

  const goToOrganizer = () => navigate(`/travel-agency/${organizer_id}`);
  const goToHome = () => navigate("/");

  return (
    <div className="trip-page trip-details-container">
      <button className="go-home-from-trip" onClick={goToHome}>
        <i className="fa-solid fa-arrow-left-long"></i> Home
      </button>

      {/* Photo Gallery */}
      <div className="trip-photo-gallery">
        {photos && photos.length > 0 ? (
          <>
            <img
              src={photos[currentPhotoIndex]}
              alt={`${name} - Photo ${currentPhotoIndex + 1}`}
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="photo-navigation-btn prev-btn"
                >
                  {"<"}
                </button>
                <button
                  onClick={nextPhoto}
                  className="photo-navigation-btn next-btn"
                >
                  {">"}
                </button>
              </>
            )}
          </>
        ) : (
          <div className="no-photo-placeholder">No Photos Available</div>
        )}
      </div>

      {/* Trip Details */}
      <div className="trip-content">
        <h1 className="trip-title">{name}</h1>

        <div className="trip-info-grid">
          <div className="trip-info-section">
            <div className="trip-detail-item">
              <MapPin className="trip-detail-icon" />
              <span>Destination: {destinition}</span>
            </div>
            <div className="trip-detail-item">
              <MapPin className="trip-detail-icon" />
              <span>availble Seats: {availbleSeats}</span>
            </div>
            <div className="trip-detail-item">
              <Calendar className="trip-detail-icon" />
              <span>
                {formatDate(start_date)} - {formatDate(end_date)}
              </span>
            </div>
            <div className="trip-detail-item">
              <Users className="trip-detail-icon" />
              <span>Max Seats: {maxseats}</span>
            </div>
          </div>

          <div className="trip-info-section">
            <div className="trip-detail-item">
              <DollarSign className="trip-detail-icon" />

              <span className="trip-price">${sale?saleprice:price}</span>

            </div>
            <div className="trip-detail-item">
              <User className="trip-detail-icon" />
              <span className="detail-label">Organizer: &nbsp;</span>
              <div className="organizer-link" onClick={goToOrganizer}>
                {organizer_name}
                <ExternalLink className="organizer-icon" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="trip-description">
          <h2>Trip Description</h2>
          <p>{description}</p>
        </div>

        <div className="trip-start-location">
          <h2>Starting Point</h2>
          <p>{startlocation}</p>
        </div>

        {new Date() < new Date(start_date) && user?.role === "traveller" ? (
          <div className="book-now-container">
            {!showBookingForm ? (
              <button
                className="book-now-btn"
                onClick={() => setShowBookingForm(true)}
              >
                Book This Trip
              </button>
            ) : (
              <form onSubmit={handleBook} className="booking-form">
                <h3>Book Your Seats</h3>

                <label htmlFor="number-of-seats">Number of Seats</label>
                <input
                  type="number"
                  id="number-of-seats"
                  min="1"
                  max={maxseats}
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                  required
                />

                {myPromotions.length > 0 && (
                  <>
                    <label htmlFor="promotion">Select Promotion</label>
                    <select
                      id="promotion"
                      value={selectedPromotion.reward_id || ''}
                      onChange={(e) => {
                        const selected = myPromotions.find(promotion => promotion.reward_id == e.target.value);
                        setSelectedPromotion(selected || {});
                      }}
                    >
                      <option value="">Select Promotion</option>
                      {myPromotions.map((promotion, index) => (
                        <option key={index} value={promotion.reward_id}>
                          {promotion.description}
                        </option>
                      ))}
                    </select>

                  </>
                )}

                {myFreeTrips.length > 0 && (
                  <>
                    <label htmlFor="free-trip">Select Free Trip</label>
                    <select
                      id="free-trip"
                      value={selectedFreeTrip.reward_id || ''}
                      onChange={(e) => {
                        console.log("Selected value:", e.target.value); // Log selected value
                        console.log("My free trips:", myFreeTrips); // Log my free trips
                        const selected = myFreeTrips.find(freeTrip => freeTrip.reward_id == e.target.value);
                        console.log("Found free trip:", selected); // Log the found trip
                        setSelectedFreeTrip(selected || {});
                      }}
                    >
                      <option value="">Select Free Trip</option>
                      {myFreeTrips.map((freeTrip, index) => (
                        <option key={index} value={freeTrip.reward_id}>
                          {freeTrip.description}
                        </option>
                      ))}
                    </select>


                  </>
                )}

                <button type="submit" className="confirm-booking-btn">
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>


      {showPopup && (
        <div className="popup-overlay-Reward-container">
          <div className="popup-overlay-Reward">
            <div className="popup-content-Reward">
              <h5>
                <span style={{ color: success ? "#1ac136" : "#ff0000" }}>
                  {success ? "successful process" : "un successful process"}
                </span>
              </h5>
              <p>
                {popMessageContent} &nbsp;
                {success ? (
                  <i
                    className="fa-solid fa-check"
                    style={{
                      color: "#1ac136",
                      fontSize: "2rem",
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-x"
                    style={{
                      color: "#ff0000",
                      fontSize: "2rem",
                    }}
                  ></i>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TripDetailsPage;
