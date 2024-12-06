import React from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import traveller from "../../assets/traveller.png";
import travelAgency from "../../assets/travel.png";
import './Preregister.css'
import { NavLink } from "react-router-dom";

function Preregister() {
  return (
    <>
      <Sub_Navbar/>
        <h4 className="title d-flex justify-content-center align-items-center">Are You ?</h4>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card m-3 text-center">
          <div className="headertitle card-header">Traveller</div>
          <div className="card-body">
            <p className="card-text">
              <img src={traveller}  height={300} width={300}></img>
            </p>
            <NavLink to="Register">
              <button className="register btn btn-primary mx-1">
                register
              </button>
            </NavLink>
          </div>
        </div>
        <div className="card m-3 text-center">
          <div className="headertitle card-header">Travel Agency</div>
          <div className="card-body">
            <p className="card-text">
              <img src={travelAgency} height={300} width={300}></img>
            </p>
            <NavLink to="Register_TravelAgency">
              <button className="register btn btn-primary mx-1">
                register
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preregister;
