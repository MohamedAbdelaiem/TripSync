import React from "react";
import "./AllTravellersList.css"
import TravellerCard from "./TravellerCard";
function AllTravellersList({all_travellers}) {
    // console.log(all_travellers[0]);
    return (
        <div className="all-travellers-list-container">
            <ul className="travellers-list">
            {all_travellers.map((trav) => (
                <li key={trav.userID} className="travellers-list-item">
                    <TravellerCard image_url={trav.image_url} id={trav.userID} prof_name={trav.profile_name} />
                </li>
            ))}
            </ul>
        </div>
    )
}

export default AllTravellersList;
