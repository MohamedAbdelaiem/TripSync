import React from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../assets/userContext";
import { useState, useEffect, useContext } from "react";
function Register() {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [userName, setUserName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
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
      setProfilePhoto(urlimage.url);
      return urlimage.url;
    } else {
      return null;
    }
  }

  const handleSubmit = async (event) => {
    let role = "traveller";
    event.preventDefault();
    try {
      const url = await handlesImage(file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/SignUp",
        {
          username: userName,
          profileName: profileName,
          email: email,
          password: password,
          role: "traveller",
          profilePhoto: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(response.data.status==="success"){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        }
        else{
          setError(response.data.message);
        }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      // setSuccess("");
    }
  };

  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePhoto(file); // Set the file to the state
  //   if (file) {
  //     setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
  //   }
  // };
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
                onChange={(e) => {handleFileChange(e)}}
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
        </div>
      </div>
    </>
  );
}

export default Register;
