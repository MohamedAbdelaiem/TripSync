import React from "react";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import "./Report.css";
import { NavLink } from "react-router-dom";

function Report() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value
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
            ></input>
            <button className="Send">Send Report</button>
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
