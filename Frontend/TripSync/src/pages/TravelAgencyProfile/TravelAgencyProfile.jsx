import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import {
  FaStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import axios from "axios"; // Import axios
import "./TravelAgencyProfile.css";

const TravelAgencyProfile = () => {
  const { id, role } = useParams(); // Extract TravelAgencyID and role from the URL
  const [agency, setAgency] = useState(null); // State for agency data
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [profileName, setProfileName] = useState(""); // Local state for the profile name
  const [profilePicture, setProfilePicture] = useState(""); // Local state for the profile picture

  // Fetch agency data on component mount or when the ID changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAgencyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Use axios to fetch agency data
        setAgency(response.data.data[0],);

        if (response.data.data[0].profilename === null)
          setProfileName(response.data.data[0].username);
        else
          setProfileName(response.data.data[0].profilename); // Initialize profileName
        
        setProfilePicture(response.data.data[0].profilephoto); // Initialize profilePicture
        console.log(response.data);
      } catch (error) {
        console.log(id);
        // console
        console.error("Error fetching travel agency data:", error);
      }
    };

    fetchAgencyData();
  }, [id]);

  const handleSave = async () => {
    try {
      // Update backend with edited data using axios
      const response = await axios.put(`/api/travel-agency/${id}`, {
        ProfileName: profileName,
        ProfilePicture: profilePicture,
      });

      // Update agency state with the new data
      setAgency((prev) => ({
        ...prev,
        ProfileName: profileName,
        ProfilePicture: profilePicture,
      }));
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result); // Preview the image
      reader.readAsDataURL(file);
    }
  };

  if (!agency) return <div>Loading...</div>; // Show loading state while fetching data

  return (
    <div className="travel-agency-container">
      {/* Side Navigation Bar */}
      <SideNavBar type={role} userId={id} />

      {/* Main Content */}
      <div className="main-content">
        <div className="profile-header">
          {/* Profile Picture */}
          {isEditing && role === "travel_agency" ? (
            <label
              htmlFor="profile-picture-input"
              className="profile-picture-label"
            >
              <img
                src={profilePicture || "placeholder.jpg"}
                alt="Profile"
                className="profile-picture"
              />
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            <img
              src={profilePicture || "placeholder.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          )}

          {/* Profile Name */}
          {isEditing && role === "travel_agency" ? (
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="profile-name-input"
            />
          ) : (
            <h2>{profileName}</h2>
          )}

          <p>
            <strong>Username:</strong> {agency.username}
          </p>
        </div>

        <div className="agency-details">
          <h3>Travel Agency Details</h3>
          <p>
            <strong>
              <FaMapMarkerAlt style={{ color: "red", marginRight: "5px" }} />{" "}
              Address:
            </strong>{" "}
            {agency.address}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} />{" "}
              Location:
            </strong>{" "}
            {agency.location}
          </p>
          <p>
            <strong>
              <FaStar style={{ color: "gold", marginRight: "5px" }} /> Rate:
            </strong>{" "}
            {agency.rate}
          </p>
          <p>
            <strong>
              <FaEnvelope style={{ color: "green", marginRight: "5px" }} />{" "}
              Email:
            </strong>{" "}
            {agency.email}
          </p>
          <p>
            <strong>
              <FaPhone style={{ color: "purple", marginRight: "5px" }} /> Phone:
            </strong>{" "}
            {agency.phonenumber}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} />{" "}
              Country:
            </strong>{" "}
            {agency.country}
          </p>
        </div>

        {/* Edit and Save Buttons */}
        {role === "travel_agency" && (
          <div className="edit-save-buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelAgencyProfile;
