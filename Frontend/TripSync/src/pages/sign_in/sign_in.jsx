import  { useState,useContext } from "react";
import Sub_Navbar from "../../Components/Sub_Navbar/Sub_Navbar";
import "./Sign_in.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";

// import navLink from React

function Sign_in() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const {setUser}=useContext(UserContext);

  const Navigate=useNavigate();



  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");
    try{
        const response=await axios.post("http://localhost:3000/api/v1/users/LogIn",{
          email,
          password
        },
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
      );
      setSuccess(response.data.message);
      console.log(response.data);
      console.log(document.cookie);
      setUser(response.data.data);
      Navigate("/");    
  }
  catch(error){
    setError(error?.message);
    console.log(error?.response?.data?.message);
  }
  }






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
                onChange={(e)=>setEmail(e.currentTarget.value)}
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
                onChange={(e)=>setPassword(e.currentTarget.value)}
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
