import {React,useState,useEffect} from "react";
import "./AllAgenciesList.css";
import axios from "axios";
import AgencyCard from "./AgencyCard";
function AllAgenciesList({ all_agencies,rerender }) {
  // console.log(all_travellers[0]);
  const [rating, setRating] = useState(0);

  const getAverageRate = async () => {
    try {
      const token=localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getAverageRating`
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setRating(res.data[0].avg);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAverageRate();
  }, [all_agencies]);
  return (
    <div className="all-agencies-list-container">
      <div className="agencyStatistics">
        <div className="stat-card-agencies total">
          <span className="stat-number-agency">{all_agencies.length}</span>
          <span className="stat-label-agency">Total Agencies</span>
        </div>
        <div className="stat-card-agencies finished">
          <span className="stat-number-agency">{(rating?rating:0)}</span>
          <span className="stat-label-agency">avgerage Rating</span>
        </div>
      </div>
      {all_agencies.length > 0 ? (
        <ul className="agencies-list">
          {all_agencies.map((agen, idx) => (
            <li key={idx} className="agencies-list-item">
              <AgencyCard
                image_url={agen.profilephoto}
                id={agen.travelagency_id}
                prof_name={agen.profilename}
                rerender={rerender}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="no-agencies">There no Travel Agencies</h1>
      )}
    </div>
  );
}

export default AllAgenciesList;
