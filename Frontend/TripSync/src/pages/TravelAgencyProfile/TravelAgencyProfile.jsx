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
  const { user, setUser } = useContext(UserContext);


  const [agency, setAgency] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profilename, setProfileName] = useState("");
  const [profilephoto, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [useremail, setUserEmail] = useState(""); // Email for `users`
  const [phonenumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [rate, setRate] = useState(0); // For travel agencies
  const [agencyEmail, setAgencyEmail] = useState(""); // Travel agency-specific email

  const [file, setFile] = useState(null);
  const [password, setPassword] = useState(""); // Travel agency password
  const [previousPassword, setPreviousPassword] = useState("");

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
        setUserEmail(data.useremail); // Corrected to use data.useremail
        setPhoneNumber(data.phonenumber);
        setCountry(data.country);
        setRate(data.rate);
        setAgencyEmail(data.email); // Travel agency-specific email
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
      // Prepare the request body based on user's role
      const updateData = {
        profilephoto: profilePhotoUrl,
        profilename,
        previousPassword,
        newPassword: password,
        useremail, // Email for `users` relation
        address,
        location,
        phoneNumber: phonenumber,
        country,
        rate,
        email: agencyEmail, // Travel agency-specific email
      };

      // if (user.role === "travel_agency") {
      //   // Add additional fields for travel agency
      //   updateData.description = description;
      //   updateData.email = agencyEmail; // Email specific to the travel agency
      // }

      // Make the API call to update the user
      await axios.patch(
        `http://localhost:3000/api/v1/users/updateMe`,
        {

          profilephoto:profilePhotoUrl,
          profilename:updateData.profilename,
          previousPassword:updateData.previousPassword,
          newPassword:updateData.newPassword,
          useremail:updateData.useremail,
          address:updateData.address,
          location:updateData.location,
          phoneNumber:updateData.phoneNumber,
          country:updateData.country,
          rate:updateData.rate,
          email:updateData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      const newemail = updateData.useremail ? updateData.useremail : user.email;

      setUser({
        ...user,
        profilename: updateData.profilename,
        profilephoto: profilePhotoUrl,
        useremail: newemail,
        address: updateData.address,
        location: updateData.location,
        phonenumber: updateData.phoneNumber,
        country: updateData.country,
        rate: updateData.rate,
        email: updateData.email,
      });

      setAgency({
        ...agency,
        profilename: updateData.profilename,
        profilephoto: profilePhotoUrl,
        useremail: newemail,
        address: updateData.address,
        location: updateData.location,
        phonenumber: updateData.phonenumber,
        country: updateData.country,
        rate: updateData.rate,
        email: updateData.email,
      });

      setIsEditing(false);
      setPassword(""); // Clear password field after successful save
      setPreviousPassword(""); // Clear previous password field
    } catch (error) {
      console.error("Error saving profile changes:", error);

      // Handle errors such as incorrect previous password
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while saving changes.");
      }
    }
  };

  if (!agency) return <div>Loading...</div>;

  return (
    <div className="travel-agency-container">
      <SideNavBar userId={id} />

      <div className="main-content">
        <div className="profile-header">
          {isEditing &&
          user.role === "travel_agency" &&
          Number(id) === user.user_id ? (
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

          {isEditing &&
          user.role === "travel_agency" &&
          Number(id) === user.user_id ? (
            <input
              className="profile-name-input"
              type="text"
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
              <FaMapMarkerAlt style={{ color: "red", marginRight: "5px" }} />{" "}
              Address:
            </strong>{" "}
            {isEditing ? (
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
              <FaGlobe style={{ color: "#007BFF", marginRight: "5px" }} />{" "}
              Location:
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

          {/* Render Email and Password Fields Only in Edit Mode */}
          {isEditing && (
            <>
              <p>
                <strong>
                  <FaEnvelope style={{ color: "purple", marginRight: "5px" }} />{" "}
                  User Email:
                </strong>
                <input
                  type="text"
                  value={useremail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </p>
              <p>
                <strong>Password:</strong>
                <input
                  type="password"
                  placeholder="Previous Password"
                  value={previousPassword}
                  onChange={(e) => setPreviousPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
            </>
          )}

          <p>
            <strong>
              <FaPhone style={{ color: "blue", marginRight: "5px" }} /> Phone:
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

          {/* Travel Agency-specific fields */}
          <p>
            <strong>Country:</strong>
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

          <p>

            <strong>
              <FaStar className="rate-icon" />
              Rate:
            </strong>

            {rate}

          </p>

          <p>
            <strong>
              <FaEnvelope style={{ color: "purple", marginRight: "5px" }} />{" "}
              Travel Agency Email:
            </strong>
            {isEditing ? (
              <input
                type="text"
                value={agencyEmail}
                onChange={(e) => setAgencyEmail(e.target.value)}
              />
            ) : (
              agencyEmail
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
