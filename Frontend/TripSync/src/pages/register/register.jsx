import React, { useState, useContext } from "react";
import { UserPlus, Mail, Lock, User, Image } from "lucide-react";
import { UserContext } from "../../assets/userContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    profileName: "",
    email: "",
    password: "",
    profilePhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  // const [fetchError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "profilephoto") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.userName) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }

    // Profile Name validation
    if (!formData.profileName) {
      newErrors.profileName = "Profile Name is required";
    } else if (formData.profileName.length < 2) {
      newErrors.profileName = "Profile Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesImage = async (file) => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "TripSync");
      data.append("cloud_name", "dxm7trzb5");

      try {
        const response = await axios.post(CLOUDINARY_URL, data);
        return response.data.url;
      } catch (error) {
        console.error("Image upload error:", error);
        return null;
      }
    }
    return null;
  };

  const togglePopupSuccess = () => {
    setShowPopupSuccess(!showPopupSuccess); // Toggle the popup visibility
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setServerSuccess("");

    if (validateForm()) {
      try {
        const photoUrl = await handlesImage(formData.profilePhoto);

        const response = await axios.post(
          "http://localhost:3000/api/v1/users/SignUp",
          {
            username: formData.userName,
            profileName: formData.profileName,
            email: formData.email,
            password: formData.password,
            role: "traveller",
            profilePhoto: photoUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.status === "success") {
          togglePopupSuccess();
          setTimeout(() => {
            localStorage.setItem("token", response.data.token);
            setUser(response.data.data.user);
            setServerSuccess(response.data.message);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }, 3000);
        } else {
          // setServerError(response.data.message);
        }
      } catch (error) {
        setServerError(error.response.data.message);
        console.error(error);
        setServerError(error.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <UserPlus className="header-icon" />
          <h2>Create Your Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {serverError && <div className="server-error">{serverError}</div>}
          {serverSuccess && (
            <div className="server-success">{serverSuccess}</div>
          )}

          <div className="form-group">
            <label htmlFor="userName">
              <User className="input-icon" /> Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Choose a unique username"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && (
              <p className="error-message">{errors.userName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="profileName">
              <User className="input-icon" /> Profile Name
            </label>
            <input
              type="text"
              id="profileName"
              placeholder="Your display name"
              value={formData.profileName}
              onChange={handleChange}
            />
            {errors.profileName && (
              <p className="error-message">{errors.profileName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail className="input-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock className="input-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group photo-upload">
            <label htmlFor="profilephoto">
              <Image className="input-icon" /> Profile Photo
              <span className="optional">(optional)</span>
            </label>
            <input
              type="file"
              id="profilephoto"
              accept="image/*"
              onChange={handleChange}
              className="file-input"
            />
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Profile Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

          <div className="login-link">
            Already have an account?
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/Sign_in");
              }}
            >
              Log in
            </a>
          </div>
        </form>
      </div>
      {showPopupSuccess && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Success</h5>
            <p>Sign in successfully</p>
            <i
              className="fa-solid fa-check"
              style={{ color: "#0fc21b", fontSize: "2rem" }}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
