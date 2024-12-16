import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import placeholder from '../../assets/OIP.jpg'
import axios from "axios";

const Blog = ({ blog_id, content, date, time, username, profilePic }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRefresh = () => {
    window.location.reload(); // Reloads the current page
  };
  const handleDelete = async () => {
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:3000/api/v1/blogs/DeleteBlog/${blog_id}`; // Include blog_id in the URL
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(response.data.message);
      console.log("Delete Success:", response.data.message);
      handleRefresh();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      console.error("Delete Error:", error);
    }
  };
  // console.log(content,blog_id,";");
  return (
    <div className="flexContainer">
      <div className="cardbody">
        <div className="flex_">
          <div className="data">
            <img
              className="blogerphoto"
              src={profilePic}
              alt="Profile"
              // height={50}
              // width={50}
            />
            <h5 className="cardtitle">{username}</h5>
          </div>
          <div className="del">
            <div className="close-icon2" onClick={handleDelete}>
              &times;
            </div>
          </div>
        </div>
        <h6 className="date card-subtitle mb-2 text-body-secondary">
          {date} {time}
        </h6>
        <p className="card-text">{content}</p>
        <img src={placeholder} className="photoContent"></img>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog_id: PropTypes.number, // Add blog_id to props
  content: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  username: PropTypes.string,
  profilePic: PropTypes.string,
};

export default Blog;
