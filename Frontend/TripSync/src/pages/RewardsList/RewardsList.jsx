// import React from "react";
// import Reward from "../../Components/trav-prof/Reward/Reward";
// import "./RewardsList.css";
// import { all_rewards } from "../../Components/Data/Rewards";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const RewardsList = () => {
//   const [userID, setUserID] = useState(null);

//   let { id } = useParams();
//   useEffect(() => {
//     setUserID(id);
//   }, [id]);

//   const rewards = all_rewards.filter((reward) => reward.travellerId == userID);

//   if (rewards.length === 0) {
//     return (
//       <>
//         <div className="empty-rewards">There is no rewards</div>
//       </>
//     );
//   }

//   return (
//     <div className="rewards-list">
//       {rewards.map((reward) => (
//         <Reward
//           key={reward.id}
//           photoLink={reward.photoLink}
//           requiredPoints={reward.requiredPoints}
//           description={reward.description}
//           reward_claimed={reward.claimed}
//         />
//       ))}
//     </div>
//   );
// };

// export default RewardsList;
