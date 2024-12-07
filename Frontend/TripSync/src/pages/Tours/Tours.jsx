import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import TourCardContainer from "../../Components/TourCardContainer/TourCardContainer";
import image2 from "../../assets/card.jpg";
import "./Tours.css";

const Tours = ({tours, onDeleteTour }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type");
console.log(tours);

  return (
    <div className="flex">
      <SideNavBar type={userType} />
      <TourCardContainer
        type={userType}
        tours={tours}
        onAddNewTour={() => navigate("/add-new-tour")}
        onDeleteTour={ onDeleteTour}
      />
    </div>
  );
};

export default Tours;
