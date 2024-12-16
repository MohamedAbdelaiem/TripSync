import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewTour.css";

const AddNewTour = ({ addTour }) => {
  const navigate = useNavigate();

  const [newTour, setNewTour] = useState({
    description: "",
    price: 0,
    maxseats: 0,
    destination: "",
    startlocation: "",
    startdate: "",
    enddate: "",
    images: [],
    sale: false,
    saleprice: 0,
  });

  const [imageInput, setImageInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Input changed: ${name} = ${type === "checkbox" ? checked : value}`); // Debug log
    setNewTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddImage = () => {
    const isValidURL = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (imageInput.trim() && isValidURL(imageInput)) {
      if (newTour.images.includes(imageInput)) {
        setErrorMessage("This image URL is already added.");
      } else {
        setNewTour((prev) => ({
          ...prev,
          images: [...prev.images, imageInput.trim()],
        }));
        setErrorMessage("");
        setImageInput("");
      }
    } else {
      setErrorMessage("Please enter a valid image URL.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newTour.sale && parseFloat(newTour.saleprice) >= parseFloat(newTour.price)) {
      alert("Sale price must be less than the original price.");
      return;
    }

    const tourData = {
      ...newTour,
      price: parseFloat(newTour.price),
      saleprice: newTour.sale ? parseFloat(newTour.saleprice) : null,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/myProfile/trips/addTrip",
        tourData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Tour added successfully:", response.data);
        navigate("/tours?type=travel_agency");
      } else {
        console.error("Unexpected response:", response);
        setErrorMessage("Failed to add the tour. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding tour:", error);
      setErrorMessage("Failed to add the tour. Please check your input and try again.");
    }
  };

  return (
    <div className="add-new-tour-container">
      <h2>Add New Tour</h2>
      <form onSubmit={handleFormSubmit} className="form1111">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label className="input-label">
          Description:
          <input
            type="text"
            name="description"
            value={newTour.description}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="description"
          />
        </label>

        <label className="input-label">
          Price:
          <input
            type="number"
            name="price"
            value={newTour.price}
            onChange={handleInputChange}
            required
            min="0"
            className="input-field"
            aria-label="price"
          />
        </label>

        <label className="input-label">
          Max Seats:
          <input
            type="number"
            name="maxseats"
            value={newTour.maxseats}
            onChange={handleInputChange}
            required
            min="1"
            className="input-field"
            aria-label="max seats"
          />
        </label>

        <label className="input-label">
          Destination:
          <input
            type="text"
            name="destination"
            value={newTour.destination}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="destination"
          />
        </label>

        <label className="input-label">
          Start Date:
          <input
            type="date"
            name="startdate"
            value={newTour.startdate}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="start date"
          />
        </label>

        <label className="input-label">
          End Date:
          <input
            type="date"
            name="enddate"
            value={newTour.enddate}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="end date"
          />
        </label>

        <label className="input-label">
          Start Location:
          <input
            type="text"
            name="startlocation"
            value={newTour.startlocation}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="start location"
          />
        </label>

        <label className="input-label">
          Has Sale:
          <input
            type="checkbox"
            name="sale"
            checked={newTour.sale}
            onChange={handleInputChange}
            className="input-field-checkbox"
            aria-label="has sale"
          />
        </label>

        {newTour.sale && (
          <label className="input-label">
            Sale Price:
            <input
              type="number"
              name="saleprice"
              value={newTour.saleprice}
              onChange={handleInputChange}
              required
              min="0"
              className="input-field"
              aria-label="sale price"
            />
          </label>
        )}

        <label className="input-label">
          Add Image URL:
          <div>
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="input-field"
              aria-label="image url"
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

        <button className="btn2" type="submit">
          Save Tour
        </button>
      </form>
    </div>
  );
};

export default AddNewTour;
