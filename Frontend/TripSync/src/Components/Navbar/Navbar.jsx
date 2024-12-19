import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import planeImage from "../../assets/plane.png";
import { NavLink } from "react-router-dom";

const Navbar = ({ id }) => {
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const togglePopup = () => {
    setShowPopup(!showPopup); // Toggle the popup visibility
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand mb-0 h4 mx-3" href="#">
          <img
            className="d-inline-block align-top mx-1 mt-1"
            src={planeImage}
            width={20}
            height={20}
            alt="plane"
          />
          My Dream Place
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
        ></button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav m-2">
            <li className="HomeNav mx-2">
              <a href="#" className="HomeNav">
                Home
              </a>
            </li>
            <a href={id} className="aboutNav">
              <li className="aboutNav nav-item mx-2">About</li>
            </a>
            <li className="blogNav mx-2" onClick={togglePopup}>
              Blogs
            </li>
            <li className="agnencyNav mx-2" onClick={togglePopup}>
              Travel agencies
            </li>
            <li className="tripNav mx-2" onClick={togglePopup}>
              Trips
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse d-flex justify-content-end">
          <NavLink to="Preregister">
            <button className="registerHome btn btn-primary mx-1">
              register
            </button>
          </NavLink>
          <NavLink to="Sign_in ">
            <button className="sign_inHome btn btn-outline-light mx-1">
              sign in
            </button>
          </NavLink>
        </div>
      </nav>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h5>Sorry</h5>
            <p>You are not log in, please log in first</p>
            <button
              className="btn btn-danger"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </>
  );
};

export default Navbar;
