import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

function BlogWrite() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [description, setDescription] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const Base_URL = "http://localhost:3000/api/v1/blogs/CreateBlog";

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

        <div className="blog-write-header">
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
        </div>
      </div>
    </motion.div>
  );
}

export default BlogWrite;