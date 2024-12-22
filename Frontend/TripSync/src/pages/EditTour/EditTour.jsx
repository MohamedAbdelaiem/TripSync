import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./EditTour.css";
import TravelAgencyProfile from "../TravelAgencyProfile/TravelAgencyProfile";
import { useContext } from "react";
import { UserContext } from "../../assets/userContext";

const EditTourPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Destinition: "",
    StartLocation: "",
    Description: "",
    Price: "",
    saleprice: "",
    sale: false,
    photos: [],
    MaxSeats:1,
    startDate: "",
    endDate: "",
    TravelAgency_ID:user.user_id,

    // Description: "",
    // Price: "",
    // MaxSeats: "",
    // Destinition: "",
    // endDate: "",
    // startDate: "",
    // StartLocation: "",
    // photos: [],
    // sale: false,
    // saleprice: "",
    // TravelAgency_ID: user.user_id,
  });
  const {tour} = location.state || {}; // Assuming you pass the tour ID through state
  const tourId=tour.trip_id;
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/trips/getTripByID/${tourId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const tourData = response.data[0];

  
        // Normalize response keys to match formData structure
        setFormData({
          StartLocation: tourData.startlocation || "",
          Destinition: tourData.destinition || "",
          Description: tourData.description || "",
          Price: tourData.price || "",
          saleprice: tourData.saleprice || "",
          sale: tourData.sale || false,
          photos: tourData.photos || [],
          MaxSeats: tourData.maxseats || 1,
          startDate: tourData.start_date || "",
          endDate: tourData.end_date || "",
          TravelAgency_ID: user.user_id,
        });
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    if (tourId) fetchTourData();
  }, [tourId, user.user_id]);
  



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, URL.createObjectURL(file)],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveSale = () => {
    setFormData((prev) => ({
      ...prev,
      sale: false,
      salePrice: "",
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //fetchTourData();
      // formData.MaxSeats=response.data.maxseats;
      // formData.startDate=response.data.startdate;
      
      // Send the updated data to the server using axios

      const token = localStorage.getItem("token");
      const response = await axios.patch(`http://localhost:3000/api/v1/users/myProfile/trips/updateTrip/${tourId}`, formData,{headers: { 
        Authorization: `Bearer ${token}`,
      },}); // Update API endpoint

      navigate(-1); // Redirect to the tour page after update
    } catch (error) {
      console.error("Error updating tour data:", error);
    }
  };

  if (!tourId) {
    return <p>No tour selected for editing.</p>;
  }

  return (
    <div className="edit-tour-container">
      <h1 className="edit-tour-title">Edit Tour</h1>
      <form className="edit-tour-form" onSubmit={handleFormSubmit}>
        {/* From and To Fields */}
        <div className="form-group">
          <label className="form-label" htmlFor="from">From:</label>
          <input
            className="form-input"
            type="text"
            id="from"
            name="StartLocation"
            value={formData.StartLocation || ""}
            onChange={handleInputChange}
            placeholder="Enter starting location"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="to">To:</label>
          <input
            className="form-input"
            type="text"
            id="to"
            name="Destinition"
            value={formData.Destinition || ""}
            onChange={handleInputChange}
            placeholder="Enter destination"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description:</label>
          <textarea
            className="form-input"
            id="description"
            name="Description"
            value={formData.Description || ""}
            onChange={handleInputChange}
            placeholder="Enter tour description"
            rows="3"
          />
        </div>

        {/* Pricing */}
        <div className="form-group">
          <label className="form-label" htmlFor="originalPrice">Original Price:</label>
          <input
            className="form-input"
            type="number"
            id="originalPrice"
            name="Price"
            value={formData.Price || ""}
            onChange={handleInputChange}
            placeholder="Enter the original price"
          />
        </div>
        {formData.sale ? (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="salePrice">Sale Price:</label>
              <input
                className="form-input"
                type="number"
                id="salePrice"
                name="saleprice"
                value={formData.saleprice || ""}
                onChange={handleInputChange}
                placeholder="Enter the sale price"
              />
            </div>
            <button
              type="button"
              className="btn remove-sale-btn"
              onClick={handleRemoveSale}
            >
              Remove Sale
            </button>
          </>
        ) : (
          <div className="form-group">
            <label className="form-label">
              <input
                type="checkbox"
                checked={formData.sale}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, sale: !prev.sale }))
                }
              />
              Add Sale
            </label>
          </div>
        )}

        {/* Images */}
        <div className="form-group">
          <label className="form-label">Images:</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageAdd}
              className="form-input"
            />
            <div className="image-preview">
              {formData.photos.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image} alt={`Tour ${index + 1}`} />
                  <button
                    type="button"
                    className="btn remove-image-btn"
                    onClick={() => handleImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="btn save-changes-btn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTourPage;
