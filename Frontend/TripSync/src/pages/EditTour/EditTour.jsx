import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditTour.css"
const EditTourPage = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  const [formData, setFormData] = useState(tour || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <form onSubmit={handleFormSubmit}>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleInputChange}
        />
      </label>
      {/* Add other fields here */}
      <button className="btn" type="submit">Save Changes</button>
    </form>
  );
};

export default EditTourPage;
