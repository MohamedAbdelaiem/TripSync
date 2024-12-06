import React from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./BlogWrite.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BlogWrite() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };
  const Base_URL = "http://localhost:3000/api/v1/blogs/CreateBlog";
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
         Base_URL ,
        {
          description,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
      console.log("error",error.response.data.message);
    }
  };

  return (
    <>
      <div className="blur-overlay">
        <NavbarSignedInner />

        <NavLink to={"blogWrite"}>
          <input
            type="text"
            placeholder="What's in your mind?"
            className="newBlogParent"
          ></input>
        </NavLink>
        <div className="blogs-container">
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
          <Blog
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
            }
            profilePic={profilePic}
            time={"12:20"}
            date={"10/10/2024"}
            username={"Esraa"}
          />
        </div>
      </div>

      <div className="centered-input-container">
        <div className="inputbox">
          <input
            type="text"
            placeholder="What's in your mind?"
            className="centered-input"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <button id="post" onClick={handleSubmit}>Post</button>
        <input
          type="file"
          className="form-controlPhoto"
          id="profilephoto"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <label>Upload Photo</label>
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Profile Preview"
            id="profilephotoPreview"
          />
        )}
      </div>
    </>
  );
}

export default BlogWrite;
