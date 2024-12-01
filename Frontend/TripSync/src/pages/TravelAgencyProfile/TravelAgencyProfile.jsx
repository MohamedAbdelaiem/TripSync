// TravelAgencyProfile.jsx
import React from "react";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaStar, FaGlobe, FaMapMarkerAlt, FaInfoCircle, FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons
import "./TravelAgencyProfile.css";

const TravelAgencyProfile = ({ agency }) => {

  return (
    <div className="travel-agency-container">
      {/* Side Navigation Bar */}
      <SideNavBar type={agency.role} />

      {/* Main Content */}
      <div className="main-content">
        <div className="profile-header">
          <img
            src={agency.ProfilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <h2>{agency.ProfileName}</h2>
          <p><strong>Username:</strong> {agency.Username}</p>
        </div>

        <div className="agency-details">
          <h3>Travel Agency Details</h3>
          {agency.role=="admin"||agency.role=="travel_agency"?(<p><strong>Travel Agency ID:</strong> {agency.TravelAgencyID}</p>):(<></>)}
          <p><strong><FaMapMarkerAlt style={{ color: "red", marginRight: "5px" }} /> Address:</strong> {agency.Address}</p>
          <p><strong><FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} />Location:</strong> {agency.Location}</p>
          <p><strong><FaStar style={{ color: "gold", marginRight: "5px" }} />Rate:</strong> {agency.Rate}</p>
          {/* <p><strong><FaInfoCircle style={{ color: "#007BFF", marginRight: "5px" }} />Description:</strong> {agency.Description}</p> */}
          <p><strong><FaEnvelope style={{ color: "green", marginRight: "5px" }} />Email:</strong> {agency.Mail}</p>
      
          <p><strong><FaPhone style={{ color: "purple", marginRight: "5px" }} />Phone:</strong> {agency.Phone}</p>
          <p><strong><FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} /> Country:</strong> {agency.Country}</p>
        </div>
      </div>
    </div>
  );
};

  

export default TravelAgencyProfile;
