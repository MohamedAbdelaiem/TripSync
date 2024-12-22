//import React, { useState } from 'react';
import React, { useState } from "react";
import "./AgencyNav.css";
import image2 from "../../assets/holidaytoursbiglogoGIF.gif";
import more from "../../assets/more.png";

import { NavLink } from "react-router-dom";

const AgencyNav = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <img src={image2} alt="Holiday Tours Logo" />
        </div>
        <div className="nav-links">
          <NavLink
            to="/TravelAgency"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/story"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Our Story
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Tours
          </NavLink>
          <NavLink
            to="/Q&A"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Q&A
          </NavLink>
          <NavLink
            to="/Review"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Review
          </NavLink>
          <NavLink
            to="/Report"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Report
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
          <button className="buttonAgen" onClick={toggleDropdown}>
            <img src={more} height={30} className="more-option" />
          </button>
          {isDropdownVisible && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/services" onClick={() => setDropdownVisible(false)}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" onClick={() => setDropdownVisible(false)}>
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" onClick={() => setDropdownVisible(false)}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      
    </>
  );
};

export default AgencyNav;
