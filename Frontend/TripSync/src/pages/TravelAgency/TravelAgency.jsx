
import  { Component } from 'react'
import AgencyNav from '../../Components/AgencyNav/AgencyNav';
import AgencyFooter from '../../Components/AgencyFooter/AgencyFooter';
import './TravelAgency.css'
import TourCardContainer from '../../Components/TourCardContainer/TourCardContainer';
import image from '../../assets/TravelAgency.jpg'
export class TravelAgency extends Component {
    render() {
      return (
        <>
          <AgencyNav />
          <div className="outerContainer">
          <div className="image-container">
            <img src={image} alt="Image Description" />
            <div className="text-overlay">
              <h1>Holiday Tours</h1>
              <p href="#orange">Where Your Journey Becomes The Story</p>
              <p>Celebrating 50 Years of Curated Travel Experiences</p>
            </div>
          </div>
          <div className="container">
          <h1>BEST TOUR PACKAGES</h1>
         <div className="line"></div>
    </div>
          <TourCardContainer />
          <AgencyFooter></AgencyFooter>
          </div>
       
        </>
      )
      
  }
  
}
export default TravelAgency