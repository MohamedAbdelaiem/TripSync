import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { 
  Image, 
  Send, 
  X, 
  Upload, 
  Smile 
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import "./BlogWrite.css";
import Blogs from "../Blogs/Blogs";
import Blog from '../../Components/Blog/Blog'
function BlogWrite() {
  const Base_Url_get = "http://localhost:3000/api/v1/blogs/AllBlogs";
  const Base_URL = "http://localhost:3000/api/v1/blogs/CreateBlog";
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleClick = () => {
    navigate("/Blog");
  };

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPhotoPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function uploadToCloudinary(fileToUpload) {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (fileToUpload) {
      const data = new FormData();
      data.append("file", fileToUpload);
      data.append("upload_preset", "TripSync");
      data.append("cloud_name", "dxm7trzb5");

      try {
        const response = await axios.post(CLOUDINARY_URL, data);
        return response.data.url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
      }
    }
    return null;
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
    setIsPosting(true);
    setError("");

    if (!description.trim()) {
      setError("Please enter a blog description");
      setIsPosting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const photoUrl = file ? await uploadToCloudinary(file) : null;

      await axios.post(
        Base_URL,
        {
          description,
          photo: photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/Blog");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to post blog");
      setIsPosting(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setDescription(prev => prev + emojiObject.emoji);
  };

  return (
    <motion.div 
      className="blog-write-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="blog-write-content">
        <button 
          className="close-btn" 
          onClick={() => navigate("/Blog")}
        >
          <X size={24} />
        </button>

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
                    profilePic={blog.profilePic || profilePic}
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
        {/* <div className="blog-write-header">
          <h2>Create a New Blog</h2>
        </div>

        <div className="blog-write-input-container">
          <textarea 
            placeholder="What's on your mind?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="blog-description-input"
            rows={4}
          />

          <div className="blog-write-actions">
            <div className="action-left">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                onChange={handlePhotoChange}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-btn">
                <Image size={20} />
                <span>Photo</span>
              </label>

              <button 
                className="emoji-btn" 
                onClick={() => setIsEmojiOpen(!isEmojiOpen)}
              >
                <Smile size={20} />
              </button>
            </div>

            <button 
              className="post-btn" 
              onClick={handlePost}
              disabled={isPosting}
            >
              {isPosting ? "Posting..." : "Post"}
              <Send size={18} />
            </button>
          </div>

          {isEmojiOpen && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="Blog Preview" />
              <button 
                className="remove-photo-btn" 
                onClick={handleRemovePhoto}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div> */}
      </div>
    </motion.div>
  );
}

export default BlogWrite;