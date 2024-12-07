// src/PhotosToSlide.js
import React from "react";
import "./PhotosToSlide.css";
// import Photos_Slider from "./components/Photos_Slider";
import Photos_Slider from "../Photos_Slider/Photos_Slider";
import photo1 from "../../assets/Rectangle 2.png";
import photo2 from "../../assets/Rectangle 9.png";
import photo3 from "../../assets/Rectangle 10.png";
import photo4 from "../../assets/Rectangle 11.png";
const photos = [photo1, photo2, photo3, photo4];

// console.log(photos);
function PhotosToSlide() {
  return (
    <div className="PhotosToSlide">
      <h3 className="head">Get inspiration for your next trip</h3>
      <Photos_Slider photos={photos} />
      <div></div>
    </div>
  );
}

export default PhotosToSlide;
