import React, { useState, useEffect } from "react";
import "./AllTravellersList.css";
import TravellerCard from "./TravellerCard";
import axios from "axios";

function AllTravellersList({ all_travellers, rerender_admin, rerender }) {
  const [activeTravelers, setActiveTravelers] = useState([]);
  const [loading, setLoading] = useState(false);

  const mostActiveTravelers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/mostfiveTravellers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActiveTravelers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mostActiveTravelers();
  }, []);

  return (
    <div className="all-travellers-list-container">
      <div className="stat-card-traveller total">
        <span className="stat-number-traveller">{all_travellers.length}</span>
        <span className="stat-label-traveller">Total Travellers</span>
      </div>

      <h2 className="most5travellerssdesign">Most Active Travellers</h2>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul className="travellers-list">
          {activeTravelers.map((trav, idx) => (
            <li key={idx} className="travellers-list-item">
              <TravellerCard
                image_url={trav.profilephoto}
                id={trav.user_id}
                prof_name={trav.profilename}
                rerender={rerender}
              />
            </li>
          ))}
        </ul>
      )}

      <h2 className="most5travellerssdesign">All Travellers</h2>
      <ul className="travellers-list">
        {all_travellers.map((trav, idx) => (
          <li key={idx} className="travellers-list-item">
            <TravellerCard
              image_url={trav.profilephoto}
              id={trav.user_id}
              prof_name={trav.profilename}
              rerender={rerender}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTravellersList;
