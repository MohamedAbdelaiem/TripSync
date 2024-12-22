import { useState } from "react";
import "./AddPolicy.css";
import axios from "axios";
function AddPolicy({ closeAddPolicyModal, adminId,rerender }) {
  

  const [formData, setFormData] = useState({
    policy_title: "",
    policy_description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/policies/createPolicy`,
        {
          policy_title: formData.policy_title,
          description: formData.policy_description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      rerender();
    } catch (err) {
      console.log(err);
    }
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
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the policy Description"
              maxLength={300}
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
