import {React,useState,useEffect} from "react";
import "./AllTravellersList.css"
import TravellerCard from "./TravellerCard";
import axios from "axios";
function AllTravellersList({ all_travellers, rerender_admin, rerender }) {
  const [activeTravelers, setActiveTravelers] = useState([]);
  const mostActiveTravelers = async() => {
    try{
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
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    mostActiveTravelers();
  }, []);

  return (
    <div className="all-travellers-list-container">
        <div className="stat-card-traveller total">
            <span className="stat-number-traveller">{all_travellers.length}</span>
            <span className="stat-label-traveller">Total Travellers</span>
        </div>
        <h2 className="most5travellerssdesign">Most Active travellers</h2>
        <ul className="travellers-list">
        {activeTravelers.map((trav, idx) => (
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
        <h2 className="most5travellerssdesign">All travellers</h2>
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
