import React from "react";
import "./SideNavBar.css";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPlane, FaQuestionCircle, FaStar,FaSun} from "react-icons/fa";
import { FaExclamationTriangle } from 'react-icons/fa'; // Replace with the appropriate icon

const SideNavBar = ({ type }) => {
  return (
    <div className="side-nav">
      <NavLink
        to={`/TravelAgencyProfile?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome style={{ marginRight: "8px" }} /> Home
      </NavLink>
      <NavLink
        to={`/story?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaInfoCircle style={{ marginRight: "8px" }} /> Our Story
      </NavLink>
      <NavLink
        to={`/tours?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaPlane style={{ marginRight: "8px" }} /> Tours
      </NavLink>
      <NavLink
        to={`/Q&A?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaQuestionCircle style={{ marginRight: "8px" }} /> Q&A
      </NavLink>
      <NavLink
        to={`/Review?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaStar style={{ marginRight: "8px" }} /> Review
      </NavLink>

      <NavLink
        to={`/Report?type=${type}`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaExclamationTriangle style={{ marginRight: "8px" }} /> Report
      </NavLink>

    </div>
  );
};

export default SideNavBar;
