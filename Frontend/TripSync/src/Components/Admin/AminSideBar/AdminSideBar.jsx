import React from "react";
import "./AdminSideBar.css"
function AdminSideBar({ onMenuSelected }) {
  return (
    <div className="admin-sidebar-caontainer">
      <h2 className="admin-sidebar-title">Admin Panel</h2>
      <ul className="admin-sidebar-menu-list">
        <li
          onClick={() => {
            onMenuSelected("all-travellers");
          }}    
          className="admin-menu-item"   
        >
          All Travellers
        </li>
        <li
          onClick={() => {
            onMenuSelected("all-agencies");
          }}
          className="admin-menu-item"
        >
          All Travel Agencies
        </li>
        <li
          onClick={() => {
            onMenuSelected("all-trips");
          }}
          className="admin-menu-item"
        >
          All Trips
        </li>
        <li
          onClick={() => {
            onMenuSelected("all-rewards");
          }}
          className="admin-menu-item"
        >
          All Rewards
        </li>
        <li
          onClick={() => {
            onMenuSelected("all-reports");
          }}
          className="admin-menu-item"
        >
          All Reports
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar