import React, { useState, useEffect } from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./Blogs.css";
import { NavLink } from "react-router-dom";

const Base_Url = "http://localhost:3000/api/v1/blogs/AllBlogs";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(Base_Url);
        const data = await response.json();

        setBlogs(data.data); // Assuming data is an array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  {
    console.log("Expected an array but got:", blogs);
  }



  return (
    <>
      <NavbarSignedInner />
      <NavLink to={"blogWrite"}>
        <input
          type="text"
          placeholder="What's in your mind?"
          className="newBlog"
        />
      </NavLink>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="blogs-container">
            {blogs.map((blog) => (
              <Blog
                key={blog.blog_id}
                content={blog.content}
                profilePic={blog.photo || profilePic}
                time={blog.time}
                date={blog.date}
                username={blog.profilename || blog.username}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Blogs;
