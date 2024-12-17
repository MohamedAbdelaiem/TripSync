import React, { useState, useContext } from "react";
import { UserPlus, Mail, Lock, User, Image } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";
import "./Register.css";

function Register() {
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
  const [serverSuccess, setServerSuccess] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    handlePhotoChange(event);
  };
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
          localStorage.setItem("token", response.data.token);
          setServerSuccess(response.data.message);
          setUser(response.data.data.user);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setServerError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setServerError(error.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <>
      <Sub_Navbar />
      <div className="Register containerregform d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Enter your user name"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileName" className="form-label">
                Profile Name
              </label>
              <input
                type="text"
                className="form-control"
                id="profileName"
                placeholder="Enter your user profile name"
                required
                onChange={(e) => setProfileName(e.currentTarget.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <div className="photo mb-2">
              <label htmlFor="profilephoto" className="form-label">
                Profile Photo <span className="optional">(optional)</span>
              </label>
              <input
                type="file"
                className="form-controlPhoto"
                id="profilephoto"
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <label htmlFor="profilephoto">Upload Photo</label>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  id="profilephoto"
                />
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btnReg">
                Register
              </button>
            </div>
          </form>
          {/* <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <UserPlus className="header-icon" />
          <h2>Create Your Account</h2> */}
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
            <label htmlFor="pass">
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
    </> 
    // </div >
  );
}

export default Register;
