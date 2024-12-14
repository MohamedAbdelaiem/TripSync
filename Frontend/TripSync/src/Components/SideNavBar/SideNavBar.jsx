import React from "react";
import "./SideNavBar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaPlane,
  FaQuestionCircle,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";

const SideNavBar = ({ userId }) => {
  // Helper function for constructing URLs
  const getNavLink = (path) => `${path}/${userId}`;

  return (
    <div className="side-nav">
      <NavLink
        to={getNavLink("/travel-agency")}
        aria-label="Navigate to Home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome style={{ marginRight: "8px" }} /> Home
      </NavLink>
      <NavLink
        to={getNavLink("/story")}
        aria-label="Navigate to Our Story"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaInfoCircle style={{ marginRight: "8px" }} /> Our Story
      </NavLink>
      <NavLink
        to={getNavLink("/tours")}
        aria-label="Navigate to Tours"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaPlane style={{ marginRight: "8px" }} /> Tours
      </NavLink>
      <NavLink
        to={getNavLink("/Q&A")}
        aria-label="Navigate to Q&A"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaQuestionCircle style={{ marginRight: "8px" }} /> Q&A
      </NavLink>
      <NavLink
        to={getNavLink("/Review")}
        aria-label="Navigate to Review"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaStar style={{ marginRight: "8px" }} /> Review
      </NavLink>
      <NavLink
        to={getNavLink("/Report")}
        aria-label="Navigate to Report"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaExclamationTriangle style={{ marginRight: "8px" }} /> Report
      </NavLink>
    </div>
  );
};

export default SideNavBar;
