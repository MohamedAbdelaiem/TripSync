import React, { useState } from "react";
import axios from "axios";
import "./CreateAdmin.css"; // Import the CSS file

function CreateAdmin({ rerender, showPopUp }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createAdmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/createUser",
        {
          user_name: formData.username,
          user_email: formData.email,
          user_password: formData.password,
          role: "admin",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showPopUp("admin added successfully", "success");
      setTimeout(() => {
        rerender();
      }, 2000);
    } catch (err) {
      console.log(err);
      showPopUp("unsucessful process", "fail");
      setTimeout(() => {
        rerender();
      }, 2000);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, email } = formData;

      // Basic form validation
      if (!username || !password || !email) {
        setError("All fields are required!");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      await createAdmin();
      setError(""); // Clear any previous error
      console.log("Admin Created:", formData);
      formData.username = "";
      formData.password = "";
      formData.email = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-admin-container">
      <h2>Create Admin</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-admin-form">
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </label>

        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Create Admin
        </button>
      </form>
    </div>
  );
}

export default CreateAdmin;