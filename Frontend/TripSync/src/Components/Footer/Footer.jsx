import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>TripSync</h3>
          <p>Your ultimate travel companion, connecting travelers, agencies, and administrators on a seamless platform designed to make every journey memorable.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home_id">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><Link to="/Blog">Blogs</Link></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest travel tips and deals!</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TripSync. All rights reserved.</p>
        <div className="policy-links">
          <NavLink to="/policy" className="policy-link">Privacy Policy</NavLink>
          <NavLink to="" className="policy-link">Terms of Service</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
