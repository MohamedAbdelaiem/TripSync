import React, { useState, useEffect } from "react";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import Navbar from "../../Components/Navbar/Navbar";
import policyPhoto from "../../assets/policy2.jpg";
import "./policy.css";
import { UserContext } from "../../assets/userContext";
import PolicyCard from "../../Components/PolicyCard/PolicyCard";
import axios from "axios";

const Base_Url = "http://localhost:3000/api/v1/policies/getAllPolicies";

function Policy() {
  const [policies, setpolicy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchpolicy = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(Base_Url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setpolicy(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchpolicy();
  }, []);

  return (
    <>
      {UserContext ? <NavbarSignedIn /> : <Navbar />}
      <div className="policy-page">
        {/* Photo Section */}
        <div className="policy-photo-container">
          <img src={policyPhoto} alt="Policy" className="policyPhoto" />
        </div>

        {/* Policy Content Section */}
        <div className="policy-content">
          <h1 className="headerPolicy">Our Policy</h1>
          {isLoading ? (
            <h3 className="loading">Loading...</h3>
          ) : (
            <div className="policy-container">
              {policies.map((policy) => (
                <PolicyCard
                  key={policy.id} // Use a unique key
                  title={policy.title}
                  description={policy.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Policy;
