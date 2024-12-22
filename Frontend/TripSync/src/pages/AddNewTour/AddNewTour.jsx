import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewTour.css";
import { UserContext } from "../../assets/userContext";

const AddNewTour = () => {
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
    saleprice: null,
    TravelAgency_ID: user.user_id,
    Name:"",
  });

  const [imageFile, setImageFile] = useState(null); // For file input
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Upload image to Cloudinary
  async function handleImageUpload(file) {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "TripSync"); // Cloudinary upload preset
    data.append("cloud_name", "dxm7trzb5"); // Cloudinary cloud name

    try {
      const response = await axios.post(CLOUDINARY_URL, data);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload image. Please try again.");
      return null;
    }
  }

  // Handle image selection and upload
  const handleAddImage = async () => {
    if (imageFile) {
      const imageUrl = await handleImageUpload(imageFile);
      console.log(imageUrl);
      if (imageUrl) {
        setNewTour((prev) => ({
          ...prev,
          photos: [...prev.photos, imageUrl],
        }));
        setImageFile(null);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please select an image file.");
    }
  };

  // Form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that start date is less than end date
    if (new Date(newTour.startDate) >= new Date(newTour.endDate)) {
      setErrorMessage("Start date must be earlier than the end date.");
      return;
    }
  
    try {
      console.log("new tour");
      console.log(newTour);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/myProfile/trips/addTrip",
        newTour,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response);
      navigate(-1); // Navigate back after successful submission
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
          Name:
          <input
            type="text"
            name="Name"
            value={newTour.Name}
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="Enter tour name"
          />
        </label>

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
