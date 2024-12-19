import { useState } from "react";
import "./AddReward.css";
import axios from "axios";

function AddReward({ closeAddRewardModal, userId, rerender }) {
  const [formData, setFormData] = useState({
    reward_name: "",
    req_points: "",
    reward_photo: null,
    adminId: userId,
    type: "",
    promotion_percentage: "", // New field for promotion percentage
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setFormData({ ...formData, reward_photo: file });
    } else {
      alert("Please select an image (jpeg / jpg)");
      setFormData({ ...formData, reward_photo: null });
      e.target.value = null;
    }
  };

  async function handlesImage(filex) {
    const file = filex;
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "TripSync");
      data.append("cloud_name", "dxm7trzb5");

      const response = await axios.post(CLOUDINARY_URL, data);
      const urlimage = response.data;
      setProfilePhoto(urlimage.url);
      return urlimage.url;
    } else {
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const image = await handlesImage(formData.reward_photo);
      console.log(image);
      const reward = await axios.post(
        "http://localhost:3000/api/v1/rewards/addReward",
        {
          reward_description: formData.reward_name,
          reward_points: formData.req_points,
          photo: image,
          reward_type: formData.type,
          promotion_percentage:
            formData.type === "promotion" ? formData.promotion_percentage : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(reward.data);
    } catch (err) {
      console.log(err);
    }
    closeAddRewardModal();
    rerender();
  };

  return (
    <div className="reward-modal-overlay">
      <div className="reward-modal-container">
        <h2>Add Reward</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Reward Name:
            <input
              type="text"
              name="reward_name"
              value={formData.reward_name}
              onChange={handleInputChange}
              placeholder="Enter the reward name"
              required
            />
          </label>

          <label>
            Required Points:
            <input
              type="number"
              name="req_points"
              value={formData.req_points}
              onChange={handleInputChange}
              placeholder="Enter the required points"
              required
            />
          </label>

          <label>
            Type:
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select reward type
              </option>
              <option value="general">General</option>
              <option value="promotion">Promotion</option>
              <option value="free trip">Free Trip</option>
            </select>
          </label>

          {formData.type === "promotion" && (
            <label>
              Promotion Percentage:
              <input
                type="number"
                name="promotion_percentage"
                value={formData.promotion_percentage}
                onChange={handleInputChange}
                placeholder="Enter the promotion percentage"
                min="0"
                max="100"
                required
              />
            </label>
          )}

          <label>
            Reward Photo:
            <input
              type="file"
              name="reward_photo"
              accept=".jpeg, .jpg"
              onChange={handleFileChange}
              required
            />
          </label>

          <div className="reward-modal-buttons">
            <button type="submit">Add Reward</button>
            <button type="button" onClick={closeAddRewardModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReward;
