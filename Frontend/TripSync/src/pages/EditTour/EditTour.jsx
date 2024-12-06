import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditTour.css";

const EditTourPage = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  const [formData, setFormData] = useState({
    ...tour,
    sale: tour?.sale || false,
    originalPrice: tour?.originalPrice || "",
    salePrice: tour?.salePrice || "",
    from: tour?.from || "",
    to: tour?.to || "",
    images: tour?.images || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, URL.createObjectURL(file)],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveSale = () => {
    setFormData((prev) => ({
      ...prev,
      sale: false,
      salePrice: "",
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Tour:", formData);
    // Save changes logic here
  };

  if (!tour) {
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

        <div className="form-group">
          <label className="form-label" htmlFor="price">Current Price:</label>
          <input
            className="form-input"
            type="number"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={handleInputChange}
            placeholder="Enter current tour price"
          />
        </div>

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
