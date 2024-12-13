import React from "react";
import planeImage from "../../assets/plane.png";
import { NavLink } from "react-router-dom";
import profile from "../../assets/profile.png";
import './NavbarSignedIn.css'

function NavbarSignedIn({ id, about }) {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand mb-0 h4 mx-3" href="#">
          <img
            className="d-inline-block align-top mx-1 mt-1"
            src={planeImage}
            width={20}
            height={20}
          />
          My Dream Place
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
        ></button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav m-2 listOfNavBar">
            <li className="HomeNav mx-2">
              <a href="#" className="HomeNav">
                Home
              </a>
            </li>
            <li className="aboutNav nav-item mx-2">
              <a className="aboutNav" href={id} style={{ visibility: about }}>
                About
              </a>
            </li>
            <NavLink to="Blog" className={"blogNav"}>
              <li className="blogNav mx-2">Blogs</li>
            </NavLink>
            <NavLink to="AllAgencies" className={"AllAgencies"}>
              <li className="AllAgencies mx-2">Explore the agencies</li>
            </NavLink>
            {/* Profile and logout button at the end */}
            <div className="profile-logout-container ml-auto">
              <NavLink to="/TravelAgencyProfile">
                <img
                  src={profile}
                  height={50}
                  width={50}
                  className="profile-img"
                  alt="Profile"
                />
              </NavLink>
              <button
                className="logoutButton"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Log out
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavbarSignedIn;
