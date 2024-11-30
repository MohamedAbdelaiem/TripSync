import React from "react";
import "./SideNavBar.css";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPlane, FaQuestionCircle, FaStar } from "react-icons/fa";

const SideNavBar = () => {
  return (
    <div className="side-nav">
      <NavLink
        to="/TravelAgencyProfile"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome style={{ marginRight: "8px" }} /> Home
      </NavLink>
      <NavLink
        to="/story"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaInfoCircle style={{ marginRight: "8px" }} /> Our Story
      </NavLink>
      <NavLink
        to="/tours"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaPlane style={{ marginRight: "8px" }} /> Tours
      </NavLink>
      <NavLink
        to="/Q&A"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaQuestionCircle style={{ marginRight: "8px" }} /> Q&A
      </NavLink>
      <NavLink
        to="/Review"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaStar style={{ marginRight: "8px" }} /> Review
      </NavLink>
    </div>
  );
};

export default SideNavBar;
