import React from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Register.css";

function Register() {
  return (
    <>
      <Sub_Navbar />
      <div className="Register containerregform d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Register</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
               User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your user name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileName" className="form-label">
              Profile Name
              </label>
              <input
                type="text"
                className="form-control"
                id="profileName"
                placeholder="Enter your user profile name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
               Profile photo
              </label>
              
              <label className="optional">optional</label>
              <input
                type="image"
                className="form-control"
                id="profilephoto"
                placeholder="Enter your user name"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btnReg">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
