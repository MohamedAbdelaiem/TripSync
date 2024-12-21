import { useState, useContext } from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Sign_in.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";
import { NavLink } from "react-router-dom";
// import navLink from React

function Sign_in() {
  const [showPopupFail, setShowPopupFail] = useState(false); 
  const [showPopupSuccess, setShowPopupSuccess] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, setUser } = useContext(UserContext);
  // console.log(UserContext);
  // const [user,setUser]=useState(useContext(UserContext));

  const togglePopupFail = () => {
    setShowPopupFail(!showPopupFail); // Toggle the popup visibility
  };
  const togglePopupSuccess = () => {
    setShowPopupSuccess(!showPopupSuccess); // Toggle the popup visibility
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
          {
            setSuccess(response.data.message);
            setUser(response.data.data);
            // localStorage.setItem("user",JSON.stringify(response.data.data));
            Navigate("/");
          }
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      togglePopupFail();
      setError(error?.message);
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Sub_Navbar />
      <div className="sign_in containerSignin d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label-sign-in">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passSign" className="form-label-sign-in">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passSign"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <navLink to="/">
              <div className="d-grid">
                <button type="submit" className="btnSign">
                  Sign In
                </button>
              </div>
            </navLink>

            <navLink to="ForgetPassword">
              <button className="forgetPassword">Forget your password?</button>
            </navLink>

            {showPopupFail && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h5>Error</h5>
                  <p>Please enter correct email and password</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowPopupFail(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {showPopupSuccess && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h5>Success</h5>
                  <p>Sign in successfully</p>
                  <i className="fa-solid fa-check" style={{color:"#0fc21b", fontSize:"2rem"} }></i>
                
                </div>
              </div>
            )}

            {/* <NavLink to="ResetPassword">
              <button className="ResetPassword">Reset your password?</button>
            </NavLink> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Sign_in;
