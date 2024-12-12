import React from "react";
import "./AllTravellersList.css"
import TravellerCard from "./TravellerCard";
function AllTravellersList({ all_travellers, rerender_admin, rerender }) {
  console.log(all_travellers[0]);
  return (
    <div className="all-travellers-list-container">
      <ul className="travellers-list">
        {all_travellers.map((trav, idx) => (
          <li key={idx} className="travellers-list-item">
            <TravellerCard
              image_url={trav.profilephoto}
              id={trav.user_id}
              prof_name={trav.profilename}
              rerender = {rerender}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTravellersList;
