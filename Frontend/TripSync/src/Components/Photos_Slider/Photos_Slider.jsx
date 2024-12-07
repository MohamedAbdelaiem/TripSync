import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Photos_Slider.css";

const Photos_Slider = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); 

    return () => clearInterval(timer); 
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  if (!Array.isArray(photos) || photos.length === 0) {
    return <p>No photos available.</p>;
  }

  return (
    <div className="slider-container">
      <button onClick={prevPhoto} className="prev-button">
        &#10094;
      </button>

      <div className="photo-window">
        <img src={photos[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>

      <button onClick={nextPhoto} className="next-button">
        &#10095;
      </button>
    </div>
  );
};

Photos_Slider.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default Photos_Slider;
