import React from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./BlogWrite.css";
import { NavLink ,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Navigate } from "react-router-dom";
function BlogWrite() {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const Base_URL = "http://localhost:3000/api/v1/blogs/CreateBlog";
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClick = () => {
    navigate("/Blog"); 
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        Base_URL,
        {
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      console.log(response.data.data[0].content);
      handleClick();
    } catch (error) {
      setError(error.message);
      console.log("error", error.response.data.message);
      console.log(description);
      // console.log(token);
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
          <div class="close-icon" onClick={handleClick}></div>
        <div className="inputbox">
          <input
            type="text"
            placeholder="What's in your mind?"
            className="centered-input"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>


        {/* <NavLink to={`/Blog`}> */}
          <button id="post" onClick={handlePost}>
            Post
          </button>
        {/* </NavLink> */}
        <input
          type="file"
          className="form-controlPhoto"
          id="profilephoto"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <label htmlFor="profilephoto">Upload Photo</label>
        {photoPreview && (
          <img src={photoPreview} alt="Profile Preview" id="profilephoto" />
        )}
      </div>
    </>
  );
}

export default BlogWrite;
