import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { UserContext } from "../../assets/userContext";
import {
  FaStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import axios from "axios";
import "./TravelAgencyProfile.css";

const TravelAgencyProfile = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [agency, setAgency] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profilename, setProfileName] = useState("");
  const [profilephoto, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  async function handlesImage(file) {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "TripSync");
      data.append("cloud_name", "dxm7trzb5");

      const response = await axios.post(CLOUDINARY_URL, data);
      return response.data.url;
    }
    return null;
  }

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
        );
        const data = response.data.data[0];
        setAgency(data);

        setProfileName(data.profilename || data.username);
        setProfilePicture(data.profilephoto);
        setAddress(data.address);
        setLocation(data.location);
        setEmail(data.email);
        setPhoneNumber(data.phonenumber);
        setCountry(data.country);
      } catch (error) {
        console.error("Error fetching travel agency data:", error);
      }
    };

    fetchAgencyData();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const profilePhotoUrl = file ? await handlesImage(file) : profilephoto;

      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/updateMe`,
        {
          profilename,
          profilephoto: profilePhotoUrl,
          address,
          location,
          email,
          phonenumber,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgency((prev) => ({
        ...prev,
        profilename,
        profilephoto: profilePhotoUrl,
        address,
        location,
        email,
        phonenumber,
        country,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  if (!agency) return <div>Loading...</div>;

  return (
    <div className="travel-agency-container">
      <SideNavBar userId={id} />

      <div className="main-content">
        <div className="profile-header">
          {isEditing && user.role === "travel_agency" && Number(id) === user.user_id ? (
            <label htmlForm="profile-picture-input" className="profile-picture-label">
              <img
                src={profilephoto || "placeholder.jpg"}
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
              src={profilephoto || "placeholder.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          )}

          
          
          {isEditing && user.role === "travel_agency" && Number(id) === user.user_id ? (
            <input className="profile-name-input"
              type="text"
              name="hello"
              value={profilename}
              onChange={(e) => setProfileName(e.target.value)}
            />
          ) : (
            <h2>{profilename}</h2>
          )}

          <p>
            <strong>Username:</strong> {agency.username}
          </p>
        </div>

        <div className="agency-details">
          <h3>Travel Agency Details</h3>
          <p>
            <strong>
              <FaMapMarkerAlt style={{ color: "red", marginRight: "5px" }} /> Address:
            </strong>{" "}
            {isEditing && user.role === "travel_agency" && Number(id) === user.user_id ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              address
            )}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} /> Location:
            </strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            ) : (
              location
            )}
          </p>
          <p>
            <strong>
              <FaStar style={{ color: "gold", marginRight: "5px" }} /> Rate:
            </strong>{" "}
            {agency.rate}
          </p>
          <p>
            <strong>
              <FaEnvelope style={{ color: "green", marginRight: "5px" }} /> Email:
            </strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              email
            )}
          </p>
          <p>
            <strong>
              <FaPhone style={{ color: "purple", marginRight: "5px" }} /> Phone:
            </strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              phonenumber
            )}
          </p>
          <p>
            <strong>
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} /> Country:
            </strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            ) : (
              country
            )}
          </p>
        </div>

        {user.role === "travel_agency" && Number(id) === user.user_id && (
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
