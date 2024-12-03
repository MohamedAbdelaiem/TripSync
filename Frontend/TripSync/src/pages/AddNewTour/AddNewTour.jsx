import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddNewTour.css";

const AddNewTour = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTour } = location.state || {};

  const [newTour, setNewTour] = useState({
    description: "",
    price: "",
    maxSeats: "",
    destination: "",
    rate: "",
    duration: "",
    startLocation: "",
    images: [],
  });
  const [imageInput, setImageInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setNewTour((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTour(newTour); // Call the addTour function to add the new tour
    navigate(-1); // Navigate back to the Tours page
  };

  return (
    <div className="add-new-tour-container">
      <h2>Add New Tour</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newTour.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newTour.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Max Seats:
          <input
            type="number"
            name="maxSeats"
            value={newTour.maxSeats}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={newTour.destination}
            onChange={handleInputChange}
          />
        </label>
    
        
        <label>
          Duration (days):
          <input
            type="number"
            name="duration"
            value={newTour.duration}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Location:
          <input
            type="text"
            name="startLocation"
            value={newTour.startLocation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Add Image URL:
          <div>
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
            />
            <button type="button" onClick={handleAddImage}>
              Add Image
            </button>
          </div>
        </label>
        <div className="image-preview">
          <h4>Images:</h4>
          <ul>
            {newTour.images.map((image, index) => (
              <li key={index}>{image}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Save Tour</button>
      </form>
    </div>
  );
};

export default AddNewTour;
