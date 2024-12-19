import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, MoreVertical } from "lucide-react";
import axios from "axios";
import "./Blog.css";

const BlogPost = ({ blog }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopupFail, setShowPopupFail] = useState(false);

  const togglePopupFail = () => {
    setShowPopupFail(!showPopupFail); // Toggle the popup visibility
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/v1/blogs/DeleteBlog/${blog.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (error) {
      togglePopupFail();
      console.error("Delete Error:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="blog-post">
        <div className="blog-post-header">
          <div className="blog-author">
            <img
              src={blog.profilePic}
              alt={`${blog.username}'s profile`}
              className="author-avatar"
            />
            <div className="author-details">
              <h3>{blog.username}</h3>
              <p>
                {blog.date} • {blog.time}
              </p>
            </div>
          </div>
          <div className="blog-actions">
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Trash2 size={20} /> : <Trash2 size={20} />}
            </button>
          </div>
        </div>

        <div className="blog-content">
          <p>{blog.content}</p>
          {blog.image && (
            <div className="blog-image">
              <img src={blog.image} alt="Blog content" />
            </div>
          )}
        </div>
      </div>

      {showPopupFail && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Error</h5>
            <p>You can't delete the blog</p>
            <button
              className="btn btn-danger"
              onClick={() => setShowPopupFail(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
