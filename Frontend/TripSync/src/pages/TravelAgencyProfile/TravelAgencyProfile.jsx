import React, { useState } from "react";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { FaStar, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./TravelAgencyProfile.css";

const TravelAgencyProfile = ({ agency }) => {
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const [profileName, setProfileName] = useState(agency.ProfileName); // Local state for the profile name
  const [profilePicture, setProfilePicture] = useState(agency.ProfilePicture); // Local state for the profile picture

  const handleSave = () => {
    // Logic to save the updated profile details (e.g., send to backend)
    console.log("Saved profile:", { profileName, profilePicture });
    setIsEditing(false); // Exit edit mode
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result); // Preview the image
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="travel-agency-container">
      {/* Side Navigation Bar */}
      <SideNavBar type={agency.role} />

      {/* Main Content */}
      <div className="main-content">
        <div className="profile-header">
          {/* Profile Picture */}
          {isEditing && agency.role === "travel_agency" ? (
            <>
              <label htmlFor="profile-picture-input" className="profile-picture-label">
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
            </>
          ) : (
            <img
              src={profilePicture || "placeholder.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          )}

          {/* Profile Name */}
          {isEditing && agency.role === "travel_agency" ? (
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
            <strong>Username:</strong> {agency.Username}
          </p>
        </div>

        <div className="agency-details">
          <h3>Travel Agency Details</h3>
          {agency.role === "admin" || agency.role === "travel_agency" ? (
            <p>
              <strong>Travel Agency ID:</strong> {agency.TravelAgencyID}
            </p>
          ) : null}
          <p>
            <strong>
              <FaMapMarkerAlt style={{ color: "red", marginRight: "5px" }} /> Address:
            </strong>{" "}
            {agency.Address}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} /> Location:
            </strong>{" "}
            {agency.Location}
          </p>
          <p>
            <strong>
              <FaStar style={{ color: "gold", marginRight: "5px" }} /> Rate:
            </strong>{" "}
            {agency.Rate}
          </p>
          <p>
            <strong>
              <FaEnvelope style={{ color: "green", marginRight: "5px" }} /> Email:
            </strong>{" "}
            {agency.Mail}
          </p>
          <p>
            <strong>
              <FaPhone style={{ color: "purple", marginRight: "5px" }} /> Phone:
            </strong>{" "}
            {agency.Phone}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} /> Country:
            </strong>{" "}
            {agency.Country}
          </p>
        </div>

        {/* Edit and Save Buttons */}
        {agency.role === "travel_agency" && (
          <div className="edit-save-buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button">
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

