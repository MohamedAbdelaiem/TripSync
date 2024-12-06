import { useState } from "react";
import "./AddReward.css";
function AddReward({ closeAddRewardModal, userId }) {
  const [formData, setFormData] = useState({
    reward_name: "",
    req_points: "",
    reward_photo: null,
    adminId: userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setFormData({ ...formData, reward_photo: file });
    } else {
      alert("please select an image (jpeg / jpg)");
      setFormData({ ...formData, profilePicture: null });
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data: ", formData);
    closeAddRewardModal(); // Close the modal after submitting
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
