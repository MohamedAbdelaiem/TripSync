import React from "react";
import "./AllTribsPublic.css";
import PublicTrips from './PublicTrips'
import { useState, useEffect } from "react";

import axios from "axios";

function AllTribsListPublic()
{
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/trips/getAllTripsForAdmin",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                console.log(response.data);
                setTrips(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrips();
    }, []);

    return (
        <div className="all-trips-list-container-public">
        <ul className="all-trips-menu-list-public">
          {trips.map((trip, idx) => (
            <li className="all-trips-menu-item-public" key={idx}>
              <PublicTrips {...trip}/>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default AllTribsListPublic;
