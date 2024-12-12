import React, { useState } from "react";
import PolicyCard from "./PolicyCard";
import AddPolicy from "./AddPolicy";
import axios from "axios";

import "./AllPolicies.css";

const AllPolicies = ({ all_policies, is_admin, admin_id,rerender }) => {
  const [add_policy_opend, set_add_policy_opend] = useState(false);
  const handleDeletePolicy = async(policy_id) => {
    const policy=await axios.delete(`http://localhost:3000/api/v1/policies/deletePolicy/${policy_id}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((res)=>{
      console.log(`Policy with ID ${policy_id} deleted!`);
      rerender();
    }).catch((err)=>{
      console.log(err);
    });
    // Add delete logic here, e.g., call an API or update the state
  };

  const onAddPolicy = (admin_id) => {
    set_add_policy_opend(true);
    // Add logic to open the add policy modal
    console.log(`Policy with admin ID ${admin_id} add`);
  };

  const openAddPolicyModal = () => {
    set_add_policy_opend(true);
  };
  const closeAddPolicyModal = () => {
    set_add_policy_opend(false);
  };

  return (
    <div className="all-policies-container">
      {add_policy_opend ? (
        <div className="add-policy-modal">
          <AddPolicy
            closeAddPolicyModal={closeAddPolicyModal}
            adminId={admin_id}
            rerender = {rerender}
          />
        </div>
      ) : null}
      {is_admin && (
        <div className="add-policy-button-container">
          <button className="add-policy-button" onClick={openAddPolicyModal}>
            <h4>Add a new Policy</h4>
          </button>
        </div>
      )}
      <div className="policies-list">
        {all_policies.map((policy,idx) => (
          <PolicyCard
            key={idx}
            title={policy.title}
            description={policy.description}
            isAdmin={is_admin}

            onDelete={() => handleDeletePolicy(policy.policy_id)}
            rerender = {rerender}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPolicies;
