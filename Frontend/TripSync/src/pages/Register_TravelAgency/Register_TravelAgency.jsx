import React, { useState,useContext } from "react";
import { 
  UserPlus, Mail, Lock, User, MapPin, Phone, 
  Globe, FileText, Image, Building 
} from 'lucide-react';
import { UserContext } from "../../assets/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register_TravelAgency.css';

function Register_TravelAgency() {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    profileName: '',
    email: '',
    password: '',
    address: '',
    location: '',
    country: '',
    phoneNumber: '',
    description: '',
    profilePhoto: null
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    
    if (id === 'profilephoto') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.userName) {
      newErrors.userName = 'Username is required';
    } else if (formData.userName.length < 3) {
      newErrors.userName = 'Username must be at least 3 characters';
    }

    // Profile Name validation
    if (!formData.profileName) {
      newErrors.profileName = 'Profile Name is required';
    } else if (formData.profileName.length < 2) {
      newErrors.profileName = 'Profile Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Phone Number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    // Description validation
    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
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
    setServerError('');
    setServerSuccess('');

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
            role: "travel_agency",
            profilePhoto: photoUrl,
            address: formData.address,
            location: formData.location,
            country: formData.country,
            phoneNumber: formData.phoneNumber,
            description: formData.description,
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
          setServerSuccess("Travel Agency registered successfully");
          setUser(response.data.data);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setServerError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setServerError(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="travel-agency-register-container">
      <div className="travel-agency-register-card">
        <div className="travel-agency-register-header">
          <Building className="header-icon" />
          <h2>Travel Agency Registration</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="travel-agency-register-form">
          {serverError && <div className="server-error">{serverError}</div>}
          {serverSuccess && <div className="server-success">{serverSuccess}</div>}

          <div className="form-columns">
            <div className="form-column">
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
                {errors.userName && <p className="error-message">{errors.userName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="profileName">
                  <User className="input-icon" /> Profile Name
                </label>
                <input
                  type="text"
                  id="profileName"
                  placeholder="Your agency display name"
                  value={formData.profileName}
                  onChange={handleChange}
                />
                {errors.profileName && <p className="error-message">{errors.profileName}</p>}
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
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="address">
                  <MapPin className="input-icon" /> Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Your agency address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  <MapPin className="input-icon" /> Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="City or region"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <p className="error-message">{errors.location}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="country">
                  <Globe className="input-icon" /> Country
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Your country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && <p className="error-message">{errors.country}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  <Phone className="input-icon" /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Your contact number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">
              <FileText className="input-icon" /> Agency Description
            </label>
            <textarea
              id="description"
              placeholder="Tell us about your travel agency"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
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
            Register Travel Agency
          </button>

          <div className="login-link">
            Already have an account? 
            <a href="/login" onClick={(e) => {
              e.preventDefault();
              navigate('/Sign_in');
            }}>
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register_TravelAgency;