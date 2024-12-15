import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Users, User, DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TripDetailsPage.css";
const TripDetailsPage = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [trip_data, set_trip_data] = useState({});
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const name = trip_data.name;
  const description = trip_data.description;
  const price = trip_data.price;
  const maxseats = trip_data.maxseats;
  const destinition = trip_data.destinition;
  const startlocation = trip_data.startlocation;
  const photos = trip_data.photos;
  const organizer_id = trip_data.organizer_id;
  const organizer_name = trip_data.organizer_name;
  const start_date = trip_data.start_date;
  const end_date = trip_data.end_date;

    const navigate = useNavigate();
    const { trip_id } = useParams();
    
    const go_to_organizer = () => {
        navigate(`/travel-agency/${organizer_id}`);
    }
  const get_trip_data = async () => {
    //   setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/trips/getTripByID/${trip_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      set_trip_data(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_trip_data();
  }, []);

  console.log(trip_data);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };
    
    const go_to_home = () => {
        navigate("/");
    }

  return (
    <div className="trip-page trip-details-container">
      {/* Photo Gallery */}
      <button className="go-home-from-trip" onClick={go_to_home}>
        <i className="fa-solid fa-arrow-left-long"></i> Home
      </button>
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
              <span className="trip-price">${price}</span>
            </div>
            <div className="trip-detail-item">
              <User className="trip-detail-icon" />
              <span className="detail-label">Organizer: &nbsp;</span>
              <div className="organizer-link" onClick={go_to_organizer}>
                {organizer_name}
                <ExternalLink className="organizer-icon" size={16} />
              </div>
            </div>
            {/* <div className="trip-detail-item">
              <span className="trip-id">Trip ID: {trip_id}</span>
            </div> */}
          </div>
        </div>

        {/* Description */}
        <div className="trip-description">
          <h2>Trip Description</h2>
          <p>{description}</p>
        </div>

        {/* Start Location */}
        <div className="trip-start-location">
          <h2>Starting Point</h2>
          <p>{startlocation}</p>
        </div>

        {/* Book Now Button */}
        {/* <div className="book-now-container">
          <button className="book-now-btn">Book This Trip</button>
        </div> */}
      </div>
    </div>
  );
};

export default TripDetailsPage;
