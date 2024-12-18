import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { UserContext } from "../../assets/userContext";
import {
  FaStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import axios from "axios"; // Import axios
import "./TravelAgencyProfile.css";
// const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => setProfilePicture(reader.result); // Preview the image
    //     reader.readAsDataURL(file);
    //   }
// };


const TravelAgencyProfile = () => {
  const watcher_id = location.state||{};

  const [file, setFile] = useState(null);
  const { id } = useParams(); // Extract TravelAgencyID and user.role from the URL
  const [agency, setAgency] = useState(null); // State for agency data
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [profilename, setProfileName] = useState(""); // Local state for the profile name
  const [profilephoto, setProfilePicture] = useState(""); // Local state for the profile picture
  // Fetch agency data on component mount or when the ID changes

  const { user } = useContext(UserContext);
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result); // Preview the image
  };
  
  async function handlesImage(filex) {
    const file = filex;
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "TripSync"); // Cloudinary upload preset
      data.append("cloud_name", "dxm7trzb5"); // Cloudinary cloud name
  
      const response = await axios.post(CLOUDINARY_URL, data);
      const urlimage = response.data;
      console.log(urlimage.url);
      return urlimage.url;
    } else {
      return null;
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAgencyData = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Use axios to fetch agency data
        setAgency(response.data.data[0]);

        if (response.data.data[0].profilename === null)
          setProfileName(response.data.data[0].username);
        else setProfileName(response.data.data[0].profilename); // Initialize profileName

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
    const token = localStorage.getItem("token");
    try {
      // Update backend with edited data using axios
      const url = await handlesImage(file);
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/updateMe`,
        {
          profilename: profilename,
          profilephoto: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update agency state with the new data
      setAgency((prev) => ({
        ...prev,
        profilename: profilename,
        profilephoto: url,
      }));
      console.log(response.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  if (!agency) return <div>Loading...</div>; // Show loading state while fetching data

  return (
    <div className="travel-agency-container">
      {/* Side Navigation Bar */}
      <SideNavBar userId={id}  />

      {/* Main Content */}
      <div className="main-content">
        <div className="profile-header">
          {/* Profile Picture */}
          {isEditing && user.role === "travel_agency"&&Number(id)===user.user_id ? (
            <label
              htmlFor="profile-picture-input"
              className="profile-picture-label"
            >
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

          {/* Profile Name */}
          {isEditing && user.role === "travel_agency"&&Number(id)===user.user_id ? (
            <input
              type="text"
              value={profilename}
              onChange={(e) => setProfileName(e.target.value)}
              className="profile-name-input"
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
        {user.role === "travel_agency" && Number(id)===user.user_id&& (
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
