import React, { useEffect } from "react";
import "./AllTravellersList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TravellerCard({ image_url, id, prof_name, rerender }) {
  const token = localStorage.getItem("token");
  const navigate = new useNavigate();
  const onViewProfile = () => {
    navigate(`/Traveller-Profile/${id}`);
  };
  const deletrUser = async() => {
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
        rerender();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const refreshPage = () => {
    window.location.reload();
  };

  const onBlockUser = () => {
    // refreshPage();
    deletrUser();
  };

  return (
    <div className="traveller-card-container">
      <img src={image_url} alt={prof_name} className="traveller-card-photo" />
      <h3 className="traveller-card-name">{prof_name}</h3>
      <div className="travellr-card-info">
        <div className="traveller-card-actions">
          <button
            className="view-traveller-card-profile-btn"
            onClick={onViewProfile}
          >
            View Profile
          </button>
          <button
            className="block-traveller-card-user-btn"
            onClick={onBlockUser}
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravellerCard;
