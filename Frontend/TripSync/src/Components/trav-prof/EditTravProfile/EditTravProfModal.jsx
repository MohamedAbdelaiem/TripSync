import React, { useState } from "react";
import "./EditTravProfModal.css";

const EditTravProfModal = (props) => {
  const [formData, setFormData] = useState({
    profile_name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      alert("please select an image (jpeg / jpg)");
      setFormData({ ...formData, profilePicture: null });
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data: ", formData);
    props.closeEditprofModal(); // Close the modal after submitting
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            profile name:
            <input
              type="text"
              name="profile_name"
              value={formData.profile_name}
              onChange={handleInputChange}
              placeholder="Enter new profile name"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter new email"
            />
          </label>

          <label>
            password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </label>

          <label>
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              accept=".jpeg, .jpg"
              onChange={handleFileChange}
            />
          </label>

          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={props.closeEditprofModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravProfModal;
