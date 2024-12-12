import { useState } from "react";
import "./AddPolicy.css";
import axios from "axios";
function AddPolicy({ closeAddPolicyModal, adminId }) {

  const [formData, setFormData] = useState({
    policy_title: "",
    policy_description: "",
    adminId: adminId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Policy Added successfully: ", formData);
    closeAddPolicyModal(); // Close the modal after submitting
  };

  return (
    <div className="policy-modal-overlay">
      <div className="policy-modal-container">
        <h2>Add Plicy</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Policy Title:
            <input
              type="text"
              name="policy_title"
              value={formData.policy_title}
              onChange={handleInputChange}
              placeholder="Enter the policy title"
              required
            />
          </label>
          <label>
            Policy Description:
            <textarea
              name="policy_description"
              value={formData.policy_description}
              onChange={handleInputChange}
              placeholder="Enter the policy Description"
              maxLength={50}
              required
            />
          </label>
          <div className="policy-modal-buttons">
            <button type="submit">Add Policy</button>
            <button type="button" onClick={closeAddPolicyModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddPolicy;
