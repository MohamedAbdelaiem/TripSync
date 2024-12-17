import React from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./BlogWrite.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Navigate } from "react-router-dom";
function BlogWrite() {
  const Base_Url_get = "http://localhost:3000/api/v1/blogs/AllBlogs";
  const Base_URL = "http://localhost:3000/api/v1/blogs/CreateBlog";
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const handleClick = () => {
    navigate("/Blog");
  };

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
      return urlimage.url;
    } else {
      return null;
    }
  }
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(Base_Url_get, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // setBlogs(response.data.data);
      setBlogs(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const url = await handlesImage(file);
      const response = await axios.post(
        Base_URL,
        {
          description,
          photo: url,
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

        <NavLink to={"/blogWrite"}>
          <input
            type="text"
            placeholder="What's in your mind?"
            className="newBlogParent"
          ></input>
        </NavLink>
        {isLoading ? (
          <h3 className="loading">Loading...</h3>
        ) : (
          <div className="blogs-container">
            {(() => {
              const blogElements = [];
              blogs.forEach((blog) => {
                // Convert the blog.time to a readable format (e.g., HH:mm:ss)
                const time = new Date(
                  `1970-01-01T${blog.time}Z`
                ).toLocaleTimeString();

                blogElements.push(
                  <Blog
                    key={blog.blog_id}
                    blog_id={blog.blog_id}
                    content={blog.content}
                    profilePic={blog.profilephoto || profilePic}
                    time={time} // Formatted time
                    date={new Date(blog.date).toLocaleDateString()} // Formatted date
                    username={blog.profilename || blog.username}
                    photo={blog.photo}
                  />
                );
              });
              return blogElements;
            })()}
          </div>
        )}
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
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        <label htmlFor="profilephoto">Upload Photo</label>
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Profile Preview"
            id="profilephotoWrite"
          />
        )}
      </div>
    </>
  );
}

export default BlogWrite;
