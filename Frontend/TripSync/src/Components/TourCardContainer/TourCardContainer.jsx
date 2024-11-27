//import React from 'react';
import TourCard from '../TourCard/TourCard' // Assuming TourCard is in the same directory
import image2 from '../../assets/card.jpg';
import './TourCardContainer.css';
const TourCardContainer = () => {
  return (
    <div className="tour-card-container">
      <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        price={280}
        detailsLink="#"
      />
       <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        price={280}
        detailsLink="#"
      />
       <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        price={280}
        detailsLink="#"
      />
       <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        price={280}
        detailsLink="#"
      />
    
    </div>
  );
};

export default TourCardContainer;