import React, { useState } from "react";
import "./SideNavBar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaPlane,
  FaQuestionCircle,
  FaStar,
  FaExclamationTriangle,
  FaEnvelope, // أيقونة الرسائل
} from "react-icons/fa";
import UserMessages from "../../Components/trav-prof/UserMessages/UserMessages";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../assets/userContext";

const SideNavBar = ({ userId }) => {
  const { user } = useContext(UserContext);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const { user_id } = useParams();
  const { id } = useParams();

  const getNavLink = (path) => `${path}/${userId}`;

  const openMessages = () => setIsMessagesOpen(true);
  const closeMessages = () => setIsMessagesOpen(false);



  return (
    <div className="side-nav">
      <NavLink
        to={getNavLink("/travel-agency")}
        aria-label="Navigate to Home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome style={{ marginRight: "8px" }} /> Home
      </NavLink>
      <NavLink
        to={getNavLink("/story")}
        aria-label="Navigate to Our Story"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaInfoCircle style={{ marginRight: "8px" }} /> Our Story
      </NavLink>
      <NavLink
        to={getNavLink("/tours")}
        aria-label="Navigate to Tours"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaPlane style={{ marginRight: "8px" }} /> Tours
      </NavLink>
      <NavLink
        to={getNavLink("/Q&A")}
        aria-label="Navigate to Q&A"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaQuestionCircle style={{ marginRight: "8px" }} /> Q&A
      </NavLink>
      <NavLink
        to={getNavLink("/Review")}
        aria-label="Navigate to Review"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaStar style={{ marginRight: "8px" }} /> Review
      </NavLink>

      {user.role === "traveller" && (
        <NavLink
          to={getNavLink("/Report")}
          aria-label="Navigate to Report"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaExclamationTriangle style={{ marginRight: "8px" }} /> Report
        </NavLink>
      )}

      <button className="messages-button" onClick={openMessages}>
        <FaEnvelope style={{ marginRight: "8px" }} /> Messages
      </button>
      {isMessagesOpen && (
        <UserMessages
          isOpen={isMessagesOpen}
          onClose={closeMessages}
          profileId={user_id || id} 
          currentUser={user}
          isOwner={Number(user_id) === Number(user.user_id) || Number(id) === Number(user.user_id)}
        />
      )}
    </div>
  );
};

export default SideNavBar;
