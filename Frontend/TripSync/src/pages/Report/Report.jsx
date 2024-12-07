import React from "react";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import "./Report.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Report() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value

  const Base_URL = "http://localhost:3000/api/v1/users/16/reports/addReport";
  const [description, setdescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        Base_URL,
        {
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
      console.log(description,"error", error.response.data.message);
    }
  };

  return (
    <>
      <div className="flexx">
        <SideNavBar type={userType}></SideNavBar>
        <div className="flexxx">
          {" "}
          <h1 className="TitleReport">Report an issue</h1>
          <div className="report">
            {" "}
            <input
              className="ReportContent"
              type="text"
              placeholder="Describe the issue ..."
              onChange={(e) => setdescription(e.currentTarget.value)}
            ></input>
            <button className="Send" onClick={handleSend}>
              Send Report
            </button>
            <div className="policy">
              Learn more about{" "}
              <NavLink to={"policy"} className={"policyLink"}>
                Our Policy
              </NavLink>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Report;
