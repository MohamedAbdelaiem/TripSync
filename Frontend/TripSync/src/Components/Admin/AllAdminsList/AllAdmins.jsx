import React from "react";
import "../AllAdminsList/AllAdmins.css";
import AdminCard from "./AdminCard";
function AllAdminsList({ all_admins, rerender_admin, rerender }) {
  console.log(all_admins[0]);
  return (
    <div className="all-travellers-list-container">
      <ul className="travellers-list">
        {all_admins.map((trav, idx) => (
          <li key={idx} className="travellers-list-item">
            <AdminCard
              id={trav.admin_id}
              user_name={trav.username}
              rerender = {rerender}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllAdminsList;
