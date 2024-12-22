import React, { useState } from "react";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "./Report.css";

function Report() {
  const location = useLocation();
  const { user_id } = useParams(); // Assumes your route is defined as "/Report/:id"
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value

  const Base_URL = `http://localhost:3000/api/v1/users/${user_id}/reports/addReport`;
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false); // State to control visibility

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        Base_URL,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      setIsMessageVisible(true); // Show the message on successful submission

    } catch (error) {
      setError(error.message);
      setIsMessageVisible(false); // Hide the message if there’s an error
      console.log(description, "error", error.response?.data || error);
    }
  };

  return (
    <>
      <div className="flexx">
        <SideNavBar userId={user_id}></SideNavBar>
        <div className="flexxx">
          <h1 className="TitleReport">Report an issue</h1>
          <div className="report">
            <input
              className="ReportContent"
              type="text"
              placeholder="Describe the issue ..."
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></input>
            <button className="Send" onClick={handleSend}>
              Send Report
            </button>
            <div className="policy">
              Learn more about{" "}
              <NavLink to={"/policy"} className={"policyLink"}>
                Our Policy
              </NavLink>
            </div>
            {/* Conditionally render the message */}
            {isMessageVisible && (
              <div className="messg">Your report has been received</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
