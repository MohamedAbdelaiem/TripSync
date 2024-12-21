import React, { useState } from 'react';
import { Lock, Mail, KeyRound, User, UserCircle } from 'lucide-react';
import axios from 'axios';
import './AdminEditForm.css';

const AdminEditForm = () => {
    console.log('AdminEditForm');
  const [formData, setFormData] = useState({
    newUsername: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (formData.newUsername) {
      if (formData.newUsername.length < 3) {
        newErrors.newUsername = 'Username must be at least 3 characters';
      }
      if (formData.newUsername.length > 20) {
        newErrors.newUsername = 'Username must be max 20 characters';
      }
      if (!/^[a-zA-Z0-9_]+$/.test(formData.newUsername)) {
        newErrors.newUsername = 'Username can only contain letters, numbers, and underscores';
      }
    }

    // Email validation
    if (formData.newEmail && !/\S+@\S+\.\S+/.test(formData.newEmail)) {
      newErrors.newEmail = 'Invalid email format';
    }

    // Password validation
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match';
      }
    }

    // Current password is required for any changes
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required to make changes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return; // Exit the function if validation fails
    }

    // Continue with the API call if validation passes
    const token = localStorage.getItem('token');
    axios
        .patch(
            'http://localhost:3000/api/v1/users/updateMe',
            {
                username: formData.newUsername,
                useremail: formData.newEmail,
                newPassword: formData.newPassword,
                previousPassword: formData.currentPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response.data);
            alert('Profile updated successfully');
        })
        .catch((error) => {
            console.log(error);
            alert('Profile update failed');
        });
};


  return (
    <div className="admin-edit-form-container">
      <div className="admin-edit-card">
        <div className="admin-edit-header">
          <User className="header-icon" />
          <h2>Admin Profile Edit</h2>
        </div>
        <div className="admin-edit-content">
          <form onSubmit={handleSubmit}>
            {/* Username Section */}
            <div className="form-section-admin">
              <h3>
                <UserCircle className="section-icon" /> Username Update
              </h3>
              <input className='admin-edit-input'
                type="text" 
                name="newUsername"
                placeholder="New Username" 
                value={formData.newUsername}
                onChange={handleChange}
              />
              {errors.newUsername && (
                <p className="error-message">{errors.newUsername}</p>
              )}
            </div>

            {/* Email Section */}
            <div className="form-section-admin">
              <h3>
                <Mail className="section-icon" /> Email Update
              </h3>

              <input className='admin-edit-input'
                type="email" 
                name="newEmail"
                placeholder="New Email" 
                value={formData.newEmail}
                onChange={handleChange}
              />
              {errors.newEmail && (
                <p className="error-message">{errors.newEmail}</p>
              )}
            </div>

            {/* Password Section */}
            <div className="form-section-admin">
              <h3>
                <Lock className="section-icon" /> Password Update
              </h3>
              <input className='admin-edit-input'
                type="password" 
                name="currentPassword"
                placeholder="Current Password" 
                value={formData.currentPassword}
                onChange={handleChange}
              />
              {errors.currentPassword && (
                <p className="error-message">{errors.currentPassword}</p>
              )}
              <input className='admin-edit-input'
                type="password" 
                name="newPassword"
                placeholder="New Password" 
                value={formData.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && (
                <p className="error-message">{errors.newPassword}</p>
              )}
              <input className='admin-edit-input'
                type="password" 
                name="confirmNewPassword"
                placeholder="Confirm New Password" 
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              {errors.confirmNewPassword && (
                <p className="error-message">{errors.confirmNewPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-button"
            >
              <KeyRound className="button-icon" /> Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditForm;