import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import TourCardContainer from "../../Components/TourCardContainer/TourCardContainer";
import image2 from "../../assets/card.jpg";
import "./Tours.css";

const Tours = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type");

  const [tours, setTours] = useState([
    {
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2],
      hasSale:true,
      salePrice:300,
    },
    {
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2],
      hasSale:false,
      // salePrice:300,
    },
    {
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2],
      hasSale:true,
      salePrice:300,
    },
  ]);

  const addTour = (newTour) => {
    setTours((prevTours) => [...prevTours, newTour]);
  };

  return (
    <div className="flex">
      <SideNavBar type={userType} />
      <TourCardContainer type={userType} tours={tours} />
    </div>
  );
};

export default Tours;
