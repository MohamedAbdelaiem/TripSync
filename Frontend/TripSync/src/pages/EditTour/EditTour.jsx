import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./EditTour.css";

const EditTourPage = () => {
  const location = useLocation();
  const { tourId } = location.state.trip_id || {}; // Assuming you pass the tour ID through state

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    sale: false,
    images: [],
  });

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/trips/getTripByID/${tourId}`); // API endpoint for fetching tour data
        const tourData = response.data;
        setFormData({
          ...tourData,
          sale: tourData.sale || false,
          salePrice: tourData.saleprice || "",
          originalPrice: tourData.price || "",
          from: tourData.startlocation || "",
          to: tourData.destinition|| "",
          images: tourData.photos || [],
        });
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    if (tourId) fetchTourData(); // Fetch tour data if tourId is available
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // Send the updated data to the server using axios
      const response = await axios.put(`http://localhost:3000/api/v1/users/myProfile/trips/updateTrip/1${tourId}`, formData); // Update API endpoint
      console.log("Updated Tour:", response.data);
      navigate(`/tours`); // Redirect to the tour page after update
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
            name="from"
            value={formData.from || ""}
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
            name="to"
            value={formData.to || ""}
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
            name="description"
            value={formData.description || ""}
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
            name="originalPrice"
            value={formData.originalPrice || ""}
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
                name="salePrice"
                value={formData.salePrice || ""}
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
              {formData.images.map((image, index) => (
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
