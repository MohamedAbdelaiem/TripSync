import { Component } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
// import image1 from '../../assets/Rectangle 2.png';
import bars from "../../assets/menu.png";
import video from "../../assets/video.mp4";
import Footer from "../../Components/Footer/Footer";
import PhotoSlider from "../../Components/Photos_Slider/Photos_Slider";
import PhotosToSlide from "../../Components/PhotosToSlide/PhotosToSlide";
import "./Home.css";
export class Home extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        {/* <NavbarSignedIn className="NavbarSignedIn"/> */}
        {/* <img src={image1} className="image-container mx-auto d-block m-3" width={1400} height={600} /> */}
        {/* < className="navbar"><Navbar/></> */}

        {/* <NavbarSignedIn className="NavbarSignedIn"/> */}
        {/* <img src={image1} className="image-container mx-auto d-block m-3" width={1400} height={600} /> */}
        <video autoPlay muted loop className="video-player">
          <source src={video} type="video/mp4" />
        </video>
        <div className="text-overlay">Enjoy Your Dream Vacation</div>
        {/* <div className="text-overlay-sub">Embark on your next adventure with ease—discover the world most breathtaking destinations and exclusive travel experiences, tailored just for you! </div>
        <div className="text-overlay-sub">Unlock endless possibilities for your clients—partner with us to offer curated travel experiences, seamless bookings, and unforgettable journeys! </div> */}
        <div className="AboutUs">
          <h3 className="head2">About us</h3>
          <i className="fas fa-compass"></i>
          <text className="txt1">
            Embark on your next adventure with ease—discover the world most
            breathtaking destinations and exclusive travel experiences, tailored
            just for you!
          </text>
          <div className="line"/>
          <i className="fas fa-suitcase"></i>
          <text className="txt2">
            Unlock endless possibilities for your clients—partner with us to
            offer curated travel experiences, seamless bookings, and
            unforgettable journeys!
          </text>
        </div>
        <PhotosToSlide />
        <Footer />
      </>
    );
  }
}

export default Home;
