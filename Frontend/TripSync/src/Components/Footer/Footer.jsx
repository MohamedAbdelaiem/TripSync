// src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    // <footer className="footer">
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} TripSync. All rights reserved.</p>
      <div className="policyFooter">
        Learn more about 
        <NavLink to={"policy"} className={"policyLinkFooter"}>
          Our Policy
        </NavLink>
      </div>
    </div>
    // </footer>
  );
};

export default Footer;
