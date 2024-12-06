// src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer className="footer">
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} TripSync. All rights reserved.
        </p>
      </div>
    // </footer>
  );
};

export default Footer;
