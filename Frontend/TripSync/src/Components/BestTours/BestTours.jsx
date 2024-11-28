//import React from 'react';
import TourCard from '../TourCard/TourCard' // Assuming TourCard is in the same directory
import image2 from '../../assets/card.jpg';
import './BestTours.css';
const BestTours = () => {
  return (
    <div className="tour-card-container">
   
           <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        // price={280}
        originalPrice={500}
        // salePrice={400} 
        hasSale={false}
        detailsLink="#"
      />
           <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        // price={280}
        originalPrice={500}
        // salePrice={400} 
        hasSale={false}
        detailsLink="#"
      />
           <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        // price={280}
        originalPrice={500}
        // salePrice={400} 
        hasSale={false}
        detailsLink="#"
      />
           <TourCard
        imageSrc={image2}
        title="White Desert Safari"
        description="Egypt."
        days={5}
        // price={280}
        originalPrice={500}
        salePrice={400} 
        hasSale={true}
        detailsLink="#"
      />
   
    
    </div>
  );
};

export default BestTours;