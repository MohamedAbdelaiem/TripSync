import React from "react";
import TripCard from "../../Components/trav-prof/TripsCard/TripsCard";
import "./UserTripsList.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { all_user_trips } from "../../Components/Data/all_user_trips";

const UserTripsList = (props) => {
  const [userID, setUserID] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    setUserID(id);
  }, []);

  let trips = all_user_trips.filter((trip) => trip.travellerId == userID);
  return (
    <div className="user-trips-list">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  );
};

export default UserTripsList;
