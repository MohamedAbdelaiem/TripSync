import React from "react";
import axios from "axios";
import "./AllAgenciesList.css";

function AgencyCard({ image_url, id, prof_name, rerender }) {
  const onViewProfile = () => {};
  const token = localStorage.getItem("token");
  const onBlockUser = async() => {
    await axios
      .delete(`http://localhost:3000/api/v1/users/deleteUser`, {
        data: {
          user_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("user deleted");
        rerender();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="agency-card-container">
      <div className="agency-card-info">
        <img src={image_url} alt={prof_name} className="agnecy-card-photo" />
        <h3 className="agency-card-name">{prof_name}</h3>
        <div className="agency-card-actions">
          <button
            className="view-agency-card-profile-btn"
            onClick={onViewProfile}
          >
            View Profile
          </button>
          <button className="block-agency-card-user-btn" onClick={onBlockUser}>
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgencyCard;
