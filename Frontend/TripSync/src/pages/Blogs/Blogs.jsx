import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogPost from "../../Components/Blog/Blog";
import "./Blogs.css";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";

const BASE_URL = "http://localhost:3000/api/v1/blogs/AllBlogs";

function Blogs() {
  const [showPopupFail, setShowPopupFail] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load blogs");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const togglePopupFail = () => {
    setShowPopupFail(!showPopupFail); // Toggle the popup visibility
  };
  return (
    <>
      <NavbarSignedIn />
      <div className="blogs-page">
        <div className="blogs-header">
          <div className="header-content">
            <h1>Community Blogs</h1>
            <Link to="/blogWrite" className="create-blog-btn">
              <Plus strokeWidth={2.5} />
              <span>Create New Blog</span>
            </Link>
          </div>
        </div>

        <div className="blogs-container">
          {isLoading ? (
            <div className="loading-container">
              <Loader2 className="spinner" size={48} />
              <p>Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
            </div>
          ) : (
            <AnimatePresence>
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.blog_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                >
                  <BlogPost
                    blog={{
                      id: blog.blog_id,
                      username: blog.profilename || blog.username,
                      profilePic: blog.profilephoto,
                      content: blog.content,
                      image: blog.photo,
                      date: new Date(blog.date).toLocaleDateString(),
                      time: new Date(
                        `1970-01-01T${blog.time}Z`
                      ).toLocaleTimeString(),
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
      {showPopupFail && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Success</h5>
            <p>Sign in successfully</p>
            <i
              className="fa-solid fa-check"
              style={{ color: "#0fc21b", fontSize: "2rem" }}
            ></i>
          </div>
          
        </div>
      )}
    </>
  );
}

export default Blogs;
