import React, { useState } from "react";
import AddReward from "./AddReward";
import AdminReward from "./AdminReward";
import axios from "axios";
import "./AdminRewards.css";

function AdminRewards({ all_rewards, userId, rerender }) {
    const [add_reward_opend, set_add_reward_opened] = useState(false);

    console.log(all_rewards);

    // Calculate statistics
    const totalRewards = all_rewards.length;
    const generalRewards = all_rewards.filter(reward => 
        reward.type==='general').length;
    const promotionRewards = all_rewards.filter(reward => 
      reward.type==='promotion').length;
    const freeTripRewards = all_rewards.filter(reward => 
      reward.type==='free trip').length;

    const DeleteReward = async(reward_id) => {
        const reward = await axios.delete(`http://localhost:3000/api/v1/rewards/deleteReward/${reward_id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((res)=>{
            console.log(`Reward with ID ${reward_id} deleted!`);
            rerender();
        }).catch((err)=>{
            console.log(err);
        });
        console.log("delete reward with id" + reward_id);
    }

    const closeAddRewardModal = () => {
        set_add_reward_opened(false);
    }

    const openAddRewardModal = () => {
        set_add_reward_opened(true);
    }

    return (
        <div className="admin-rewards-container">
            <div className="rewards-statistics">
                <div className="stat-card total">
                    <span className="stat-number">{totalRewards}</span>
                    <span className="stat-label">Total Rewards</span>
                </div>
                <div className="stat-card general">
                    <span className="stat-number">{generalRewards}</span>
                    <span className="stat-label">General Rewards</span>
                </div>
                <div className="stat-card promotion">
                    <span className="stat-number">{promotionRewards}</span>
                    <span className="stat-label">Promotions</span>
                </div>
                <div className="stat-card free-trip">
                    <span className="stat-number">{freeTripRewards}</span>
                    <span className="stat-label">Free Trips</span>
                </div>
            </div>

            {add_reward_opend ? (
                <div className="add-reward-modal">
                    <AddReward
                        closeAddRewardModal={closeAddRewardModal}
                        userId={userId}
                        rerender={rerender}
                    />
                </div>
            ) : null}
            <div className="add-admin-reward-container">
                <button
                    className="add-admin-reward-button"
                    onClick={openAddRewardModal}
                >
                    <h4>Add a New Reward</h4>
                </button>
            </div>
            <div className="all-rewards-container">
                {all_rewards.map((reward,idx) => (
                    <li className="reward-item" key={idx}>
                        <AdminReward
                            id={reward.reward_id}
                            photoLink={reward.photo}
                            requiredPoints={reward.pointsneeded}
                            description={reward.description}
                            userId={reward.admin_id}
                            DeleteReward={DeleteReward}
                            rerender={rerender}
                        />
                    </li>
                ))}
            </div>
        </div>
    );
}

export default AdminRewards;