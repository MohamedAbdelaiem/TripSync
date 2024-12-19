import React, { useContext } from "react";
import planeImage from "../../assets/plane.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import profile from "../../assets/profile.png";
import { UserContext } from "../../assets/userContext";
import "./NavbarSignedIn.css";

function NavbarSignedIn({ id }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => {
    if (user) {
      if (user.role === "traveller") {
        navigate(`/Traveller-Profile/${user.user_id}`);
      } else if (user.role === "travel_agency") {
        navigate(`/travel-agency/${user.user_id}`);
      } else if (user.role === "admin") {
        navigate(`/Admin-view/${user.user_id}`);
      }
    }
  };

  // Check if the current URL is "http://localhost:5173/"
  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand mb-0 h4 mx-3" href="#">
          <img
            className="d-inline-block align-top mx-1 mt-1"
            src={planeImage}
            width={20}
            height={20}
            alt="Logo"
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
              <a href="/" className="HomeNav">
                Home
              </a>
            </li>
            {isHomePage && ( // Only render the "About" link if on the homepage
              <li className="aboutNav nav-item mx-2">
                <a className="aboutNav" href={id}>
                  About
                </a>
              </li>
            )}
            <NavLink to="/Blog" className={"blogNav"}>
              <li className="blogNav mx-2">Blogs</li>
            </NavLink>
            <NavLink to="/AllAgencies" className={"AllAgencies"}>
              <li className="AllAgencies mx-2">Travel agencies</li>
            </NavLink>
            <NavLink to="/AllTripsList" className={"AllTripsList"}>
              <li className="AllTripsList mx-2">Trips</li>
            </NavLink>
            {/* Profile and logout button at the end */}
            <div className="profile-logout-container ml-auto">
              <img
                src={user ? user.profilephoto : profile}
                height={50}
                width={50}
                className="profile-img"
                alt="Profile"
                onClick={goToProfile}
              />
              <button
                className="logoutButton"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setUser(null);
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
