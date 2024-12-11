import React from "react";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import Navbar from "../../Components/Navbar/Navbar";
import policy from "../../assets/policy2.jpg";
import "./policy.css";
import { UserContext } from "../../assets/userContext";
function Policy() {
  return (
    <>
      {UserContext ? <NavbarSignedIn /> : <Navbar />}
      <div className="flexPolicy">
        <img src={policy} className="policyPhoto"></img>
        <div>
          {" "}
          <h1 className="headerPolicy">Our Policy</h1>
        </div>
      </div>
    </>
  );
}

export default Policy;
