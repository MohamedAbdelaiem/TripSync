import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewTour.css";

const AddNewTour = ({ addTour }) => {
  const navigate = useNavigate();
// http://localhost:3000/api/v1/users/myProfile/trips/addTrip
  const [newTour, setNewTour] = useState({
    description: "",
    price: "",
    maxSeats: "",
    destination: "",
    duration: "",
    startLocation: "",
    images: [],
    hasSale: false,
    salePrice: "",
  });
  const [imageInput, setImageInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (addTour) {
      addTour({
        ...newTour,
        price: parseFloat(newTour.price),
        salePrice: newTour.hasSale ? parseFloat(newTour.salePrice) : null,
      }); // Add the new tour
      navigate("/tours?type=travel_agency"); // Navigate back to Tours page
    }
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
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newTour.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Max Seats:
          <input
            type="number"
            name="maxSeats"
            value={newTour.maxSeats}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={newTour.destination}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Duration (days):
          <input
            type="number"
            name="duration"
            value={newTour.duration}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Start Location:
          <input
            type="text"
            name="startLocation"
            value={newTour.startLocation}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Has Sale:
          <input
            type="checkbox"
            name="hasSale"
            checked={newTour.hasSale}
            onChange={handleInputChange}
          />
        </label>
        {newTour.hasSale && (
          <label>
            Sale Price:
            <input
              type="number"
              name="salePrice"
              value={newTour.salePrice}
              onChange={handleInputChange}
              required={newTour.hasSale}
            />
          </label>
        )}
        <label>
          Add Image URL:
          <div>
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
            />
            <button className="btn1" type="button" onClick={handleAddImage}>
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
        <button className="btn2" type="submit">Save Tour</button>
      </form>
    </div>
  );
};

export default AddNewTour;
