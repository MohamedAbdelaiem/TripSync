import React, { useState } from "react";
import "./Photos_Slider.css"; // Optional for styling
import "../PhotosToSlide/PhotosToSlide";
import PropTypes from "prop-types";

const Photos_Slider = ({ photos }) => {
  console.log(photos);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next photo
  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const safePhotos = Array.isArray(photos) && photos.length > 0 ? photos : [];
  // Move to the previous photo
  const prevPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  if (safePhotos.length === 0) {
    return <p>No photos available.</p>;
  }

  return (
    <div className="slider-container">
      <button onClick={prevPhoto} className="prev-button">
        &#10094;
      </button>

      <div className="photo-window">
        <img
          src={photos[currentIndex]}
          className="photo"
          alt={`Slide ${currentIndex + 1}`}
        />
      </div>

      <button onClick={nextPhoto} className="next-button">
        &#10095;
      </button>
    </div>
  );
};

Photos_Slider.propTypes = {
  photos: PropTypes.array,
};
// Photos_Slider.defaultProps = {
//   photos: [], // Default to empty array if no photos are passed
// };

export default Photos_Slider;
