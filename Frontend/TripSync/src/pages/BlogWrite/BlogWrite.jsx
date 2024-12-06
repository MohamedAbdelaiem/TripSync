import React from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./BlogWrite.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function BlogWrite() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
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

      {/* Centered input box */}
      <div className="centered-input-container">
        <div className="inputbox">
          <input
            type="text"
            placeholder="What's in your mind?"
            className="centered-input"
          />
        </div>

        <button id="post">Post</button>
        <input
          type="file"
          className="form-controlPhoto"
          id="profilephoto"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <label >Upload Photo</label>
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
