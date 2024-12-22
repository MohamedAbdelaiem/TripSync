import React, { useEffect } from "react";
import "./AllAdmins.css"
import axios from "axios";

function AdminCard({id, user_name, rerender }) {
  const token = localStorage.getItem("token");
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
      <h3 className="traveller-card-name">{user_name}</h3>
      <div className="travellr-card-info">
        <div className="traveller-card-actions">
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

export default AdminCard;
