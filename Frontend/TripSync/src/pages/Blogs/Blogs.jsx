import React, { useState, useEffect } from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./Blogs.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
const Base_Url = "http://localhost:3000/api/v1/blogs/AllBlogs";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(Base_Url, {
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

  

  return (
    <>
      {/* <NavbarSignedInner /> */}
      <NavbarSignedIn />
      <NavLink to={"blogWrite"}>
        <input
          type="text"
          placeholder="What's in your mind?"
          className="newBlog"
        />
      </NavLink>
  
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <div className="blogs-container">
          {(() => {
            const blogElements = [];
            blogs.forEach((blog) => {
              // Convert the blog.time to a readable format (e.g., HH:mm:ss)
              const time = new Date(`1970-01-01T${blog.time}Z`).toLocaleTimeString();
  
              blogElements.push(
                <Blog
                  key={blog.blog_id}
                  blog_id={blog.blog_id}
                  content={blog.content}
                  profilePic={blog.photo || profilePic}
                  time={time} // Formatted time
                  date={new Date(blog.date).toLocaleDateString()} // Formatted date
                  username={blog.profilename || blog.username}
                />
              );
            });
            return blogElements;
          })()}
        </div>
      )}
    </>
  );
  
}

export default Blogs;
