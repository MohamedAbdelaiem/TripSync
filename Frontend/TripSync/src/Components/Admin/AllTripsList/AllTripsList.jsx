import {React,useEffect,useState} from "react";
import "./AllTripsList.css";
import AdminTripCard from "./adminTripCard";
import axios from "axios";

function AllTripsList({ all_trips, rerender }) {
  // Calculate trip statistics
  const totalTrips = all_trips.length;
  const notStartedTrips = all_trips.filter(
    trip => new Date(trip.startdate) > new Date()
  ).length;
  const finishedTrips = all_trips.filter(
    trip => new Date(trip.startdate) <= new Date()
  ).length;

  const [mostTrips,setMost5Trips]=useState([]);
  useEffect(()=>{
    most5Trips();
  },[]);

  const most5Trips=async()=>{
    try{
      const token=localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/v1/trips/mostFiveTrips`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setMost5Trips(res.data);
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <div className="all-trips-list-container">
      <div className="trips-statistics">
        <div className="stat-card total">
          <span className="stat-number">{totalTrips}</span>
          <span className="stat-label">Total Trips</span>
        </div>
        <div className="stat-card not-started">
          <span className="stat-number">{notStartedTrips}</span>
          <span className="stat-label">Not Started</span>
        </div>
        <div className="stat-card finished">
          <span className="stat-number">{finishedTrips}</span>
          <span className="stat-label">Finished</span>
        </div>
      </div>

      <h2 className="most5tripsdesign">Most 5 Trips purchased</h2>
      <ul className="all-trips-menu-list">
        {mostTrips.map((trip, idx) => (
          <li className="all-trips-menu-item" key={idx}>
            <AdminTripCard {...trip} rerender={rerender} />
          </li>
        ))}
      </ul>

      <h2 className="most5tripsdesign">All Tribs</h2>

      <ul className="all-trips-menu-list">
        {all_trips.map((trip, idx) => (
          <li className="all-trips-menu-item" key={idx}>
            <AdminTripCard {...trip} rerender={rerender} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTripsList;