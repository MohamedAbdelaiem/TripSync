//import React from 'react';
import './AgencyNav.css'
import image2 from '../../assets/holidaytoursbiglogoGIF.gif';

import { NavLink } from "react-router-dom";

const AgencyNav = () => {
    return (<>
  
     <nav>
 
      <div className="logo">
        <img src={image2} alt="Holiday Tours Logo" />
      </div>
      <div className="nav-links">
        <NavLink 
          to="/TravelAgency" 
          className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink 
          to="/story" 
          className={({ isActive }) => (isActive ? "active" : "")}>
          Our Story
        </NavLink>
        <NavLink 
          to="/tours" 
          className={({ isActive }) => (isActive ? "active" : "")}>
          Tours
        </NavLink>
        <NavLink 
          to="/Q&A" 
          className={({ isActive }) => (isActive ? "active" : "")}>
          Q&A
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
      </div>
   
</nav>


 
      </>
  );
};

export default AgencyNav