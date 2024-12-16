import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewTour.css";
import { useContext } from "react";
import { UserContext } from "../../assets/userContext";

const AddNewTour = ({ addTour }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [newTour, setNewTour] = useState({
    Description:"",
    Price:0,
    MaxSeats:0,
    Destinition:"",
    endDate:"",
    startDate:"",
    StartLocation:"",
    photos:[],
    sale:false,
    saleprice:0,
    TravelAgency_ID: user.user_id,
  });

  const [imageInput, setImageInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Input changed: ${name} = ${type === "checkbox" ? checked : value}`); // Debug log
    setNewTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
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
      if (newTour.photos.includes(imageInput)) {
        setErrorMessage("This image URL is already added.");
      } else {
        setNewTour((prev) => ({
          ...prev,
          photos: [...prev.photos, imageInput.trim()],
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

    if (newTour.sale && parseFloat(newTour.saleprice) >= parseFloat(newTour.Price)) {
      alert("Sale price must be less than the original price.");
      return;
    }

    const tourData = {
      ...newTour,
      Price: parseFloat(newTour.Price),
      
      saleprice: newTour.sale ? parseFloat(newTour.saleprice) : null,
      MaxSeats:parseInt(newTour.MaxSeats),
    };

    try {
      console.log(tourData); 
      //console.log(newTour.maxseats.type); 
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
            name="Description"
            value={newTour.Description}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="Description"
          />
        </label>

        <label className="input-label">
          Price:
          <input
            type="number"
            name="Price"
            value={newTour.Price}
            onChange={handleInputChange}
            required
            min="0"
            className="input-field"
            aria-label="Price"
          />
        </label>

        <label className="input-label">
          Max Seats:
          <input
            type="number"
            name="MaxSeats"
            value={newTour.MaxSeats}
            onChange={handleInputChange}
            required
            min="1"
            className="input-field"
            aria-label="maxSeats"
          />
        </label>

        <label className="input-label">
          Destination:
          <input
            type="text"
            name="Destinition"
            value={newTour.Destinition}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="Destination"
          />
        </label>

        <label className="input-label">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={newTour.startDate}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="startDate"
          />
        </label>

        <label className="input-label">
          End Date:
          <input
            type="date"
            name="endDate"
            value={newTour.endDate}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="endDate"
          />
        </label>

        <label className="input-label">
          Start Location:
          <input
            type="text"
            name="StartLocation"
            value={newTour.StartLocation}
            onChange={handleInputChange}
            required
            className="input-field"
            aria-label="StartLocation"
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
            {newTour.photos.map((image, index) => (
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
