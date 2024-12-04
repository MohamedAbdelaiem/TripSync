import React from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Register.css";
import {
  useState
  
 } from "react";
function Register() {
      
  const [photoPreview, setPhotoPreview] = useState(null);
      
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };
  return (
    <>
      <Sub_Navbar />
      <div className="Register containerregform d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Register</h3>
          <form>
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
                onChange={handlePhotoChange}
              />
              <label htmlFor="profilephoto">Upload Photo</label>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  id="profilephotoPreview"
                />
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btnReg">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
