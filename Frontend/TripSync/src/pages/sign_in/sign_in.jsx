import React from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Sign_in.css";
// import navLink from React

function Sign_in() {
  return (
    <>
      <Sub_Navbar />
      <div className="sign_in containerSignin d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Sign In</h3>
          <form>
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
              <label htmlFor="password" className="form-label">
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

            <div className="d-grid">
              <button type="submit" className="btnSign">
                Sign In
              </button>
            </div>

            <navLink to="ForgetPassword">
              <button className="forgetPassword">Forget your password?</button>
            </navLink>

            {/* <navLink to="ResetPassword">
              <button className="ResetPassword">Reset your password?</button>
            </navLink> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Sign_in;
