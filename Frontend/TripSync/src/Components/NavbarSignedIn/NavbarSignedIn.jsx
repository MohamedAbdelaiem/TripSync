import React from "react";
import planeImage from "../../assets/plane.png";
import { NavLink } from "react-router-dom";
import profile from "../../assets/profile.png";
function NavbarSignedIn() {
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
          <ul className="navbar-nav m-2">
            <li className="nav-item active mx-2">
              <a href="#">Home</a>
            </li>

            <li className="nav-item active mx-2">Discover</li>
            <li className="nav-item active mx-2">Activities</li>
            <li className="nav-item active mx-2">About</li>
            <li className="nav-item active mx-2">Content</li>
          </ul>
        </div>
        <NavLink to="profile">
          <img src={profile} height={50} width={50} className="mx-3" />
        </NavLink>
      </nav>
    </>
  );
}

export default NavbarSignedIn;
