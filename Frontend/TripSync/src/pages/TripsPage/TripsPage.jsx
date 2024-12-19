import React, { useEffect, useState } from "react";
import axios from "axios";
import TripCard from "../../Components/trav-prof/TripsCard/TripsCard";
import "./TripsPage.css";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/trips/getAllTrips",{ headers: { 
            Authorization: `Bearer ${token}`,
          },});
          console.log(response.data)
        setTrips(response.data); // Assuming the API response contains a `trips` array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trips. Please try again later.");
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <div className="loading">Loading trips...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="trips-page">
      <h1>All Trips</h1>
      <div className="trips-container">
        {trips.map((trip) => (
          <TripCard key={trip.trip_id} {...trip} />
        ))}
      </div>
    </div>
  );
}

export default TripsPage;
