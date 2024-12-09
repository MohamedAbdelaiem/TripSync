import React,{useState} from "react";
import AddReward from "./AddReward";
import AdminReward from "./AdminReward";
import "./AdminRewards.css";

function AdminRewards({ all_rewards, userId }) {
    const [add_reward_opend, set_add_reward_opened] = useState(false); 
    const DeleteReward = (id) => {
        console.log("delete reward with id" + id);
    }
    const closeAddRewardModal = () => {
        set_add_reward_opened(false);
    }
    const openAddRewardModal = () => {
        set_add_reward_opened(true);
    }
    return (
      <div className="admin-rewards-container">
        {add_reward_opend ? (
          <div className="add-reward-modal">
            <AddReward
              closeAddRewardModal={closeAddRewardModal}
              userId={userId}
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
          {all_rewards.map((reward) => (
            <li className="reward-item" key={reward.id}>
              <AdminReward
                id={reward.id}
                photoLink={reward.photoLink}
                requiredPoints={reward.requiredPoints}
                description={reward.description}
                userId={userId}
                DeleteReward={DeleteReward}
              />
            </li>
          ))}
        </div>
      </div>
    );
}

export default AdminRewards;
