import { useState, useContext } from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Sign_in.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../assets/userContext";

function Sign_in() {
  const [showPopupFail, setShowPopupFail] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, setUser } = useContext(UserContext);

  const togglePopupFail = () => {
    setShowPopupFail(!showPopupFail);
  };
  const togglePopupSuccess = () => {
    setShowPopupSuccess(!showPopupSuccess);
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/LogIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.status === "success") {
        togglePopupSuccess();
        setTimeout(() => {
          setSuccess(response.data.message);
          setUser(response.data.data);
          Navigate("/");
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      togglePopupFail();
      setError(error?.message);
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <div className="icon-circle">
              <i className="fas fa-user"></i>
            </div>
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <div className="input-wrapper">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>

            <div className="links-container">
              <NavLink to="/signup" className="signup-link">
                Create an account
              </NavLink>
            </div>
          </form>

          {showPopupFail && (
            <div className="popup-overlay">
              <div className="popup-content error">
                <i className="fas fa-times-circle"></i>
                <h5>Error</h5>
                <p>Please enter correct email and password</p>
                <button
                  className="popup-button"
                  onClick={() => setShowPopupFail(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showPopupSuccess && (
            <div className="popup-overlay">
              <div className="popup-content success">
                <i className="fas fa-check-circle"></i>
                <h5>Success</h5>
                <p>Sign in successful</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sign_in;