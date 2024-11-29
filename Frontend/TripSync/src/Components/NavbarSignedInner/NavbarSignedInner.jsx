import React from "react";
import planeImage from "../../assets/plane.png";
import { NavLink } from "react-router-dom";
import profile from "../../assets/profile.png";
import "./NavbarSignedInner.css";
function NavbarSignedInner() {
  return (
    <>
      <nav className="navbarSignedInner navbar-expand-sm navbar-light bg-light">
        <a className="logonav navbar-brand mb-0 h4 mx-3" href="#">
          <img
            className="d-inline-block align-top mx-1"
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
        <NavLink to="profile">
          <img
            src={profile}
            height={50}
            width={50}
            className="profilephoto mx-3"
          />
        </NavLink>
      </nav>
    </>
  );
}

export default NavbarSignedInner;
