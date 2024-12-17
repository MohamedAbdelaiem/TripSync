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
    Description: "",
    Price: "",
    MaxSeats: "",
    Destinition: "",
    endDate: "",
    startDate: "",
    StartLocation: "",
    photos: [],
    sale: false,
    saleprice: "",
    TravelAgency_ID: user.user_id,
  });

  const [imageFile, setImageFile] = useState(null); // For file input
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
    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const imageUrl = fileReader.result; // Base64 image data
        setNewTour((prev) => ({
          ...prev,
          photos: [...prev.photos, imageUrl],
        }));
        setErrorMessage("");
        setImageFile(null);
      };
      fileReader.readAsDataURL(imageFile);
    } else {
      setErrorMessage("Please select an image file.");
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
      MaxSeats: parseInt(newTour.MaxSeats),
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
            name="Description"
            value={newTour.Description}
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="Enter tour description"
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
            placeholder="e.g. 1000"
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
            placeholder="e.g. 50"
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
            placeholder="Enter destination"
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
            placeholder="Enter start location"
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
              placeholder="e.g. 800"
            />
          </label>
        )}

        <label className="input-label">
          Upload Image:
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="input-field"
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
              <li key={index}>
                <img src={image} alt={`tour-${index}`} width="100" />
              </li>
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
