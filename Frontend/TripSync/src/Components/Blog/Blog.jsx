//import React from 'react';
import PropTypes from "prop-types";
import "./Blog.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Blog = ({ content, date, time, username, profilePic }) => {
  return (
      <>

     
      <div className="flexContainer">
        <div className="cardbody">
          <img
            className="blogerphoto"
            src={profilePic}
            height={50}
            width={50}
          />
          <h5 className="cardtitle">{username}</h5>
          <h6 className="date card-subtitle mb-2 text-body-secondary">
            {date} {time}
          </h6>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </>
  );
};
Blog.propTypes = {
  content: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  username: PropTypes.string,
  profilePic: PropTypes.string,
};

export default Blog;
