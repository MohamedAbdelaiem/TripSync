import { useState, useContext } from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Sign_in.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";

// import navLink from React

function Sign_in() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, setUser } = useContext(UserContext);
  // console.log(UserContext);
  // const [user,setUser]=useState(useContext(UserContext));

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
        setSuccess(response.data.message);
        console.log(response.data.data);
        setUser(response.data.data);
        console.log(user);
        if (user.role === "admin")
          Navigate(`/Admin-view/${response.data.data.user_id}`);
        else if (user.role === "travel_agency")
          Navigate(
            `/travel-agency/${response.data.data.user_id}/${response.data.data.role}`
          );
        else Navigate(`/Traveller-Profile/${response.data.data.user_id}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
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
              <label htmlFor="email" className="form-label">
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
              <label htmlFor="passSign" className="form-label">
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
              {" "}
              <div className="d-grid">
                <button type="submit" className="btnSign">
                  Sign In
                </button>
              </div>
            </navLink>

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
