// import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import planeImage from "../../assets/plane.png";
import { NavLink } from "react-router-dom";

const Navbar = ({id}) => {
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
            <li className="HomeNav active mx-2">
              <a href="#">Home</a>
            </li>
            <a href={id}>
              <li className="nav-item active mx-2">About</li>
            </a>

            <NavLink to="Blog">
              <li className="blogNav mx-2">Blogs</li>
            </NavLink>
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
    </>
  );
};

export default Navbar;
