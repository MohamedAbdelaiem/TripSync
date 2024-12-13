import { Component } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import aboutUs from "../../assets/About us.png";
import bars from "../../assets/menu.png";
import video from "../../assets/video.mp4";
import Footer from "../../Components/Footer/Footer";

import PhotoSlider from "../../Components/Photos_Slider/Photos_Slider";
import PhotosToSlide from "../../Components/PhotosToSlide/PhotosToSlide";
import "./Home.css";
import { UserContext } from "../../assets/userContext";
export class Home extends Component {
  render() {
    return (
      <>
        {localStorage.getItem("token") ? (
          <NavbarSignedIn id={"#about_id"} />
        ) : (
          <Navbar id={"#about_id"} />
        )}
        {/* <Navbar id={"#about_id"} /> */}

        <video autoPlay muted loop className="video-player">
          <source src={video} type="video/mp4" />
        </video>
        <div className="text-overlay">Enjoy Your Dream Vacation</div>

        <PhotosToSlide />
        <div className="containerAboutUs">
          <h3 className="head2">About us</h3>
          <div className="AboutUs" id="about_id">
            <text className="txt1">
              Welcome to TripSync – your ultimate travel companion, connecting
              travelers, agencies, and administrators on a seamless platform
              designed to make every journey memorable. Whether you're an
              adventurous traveler, a travel agency eager to showcase your
              services, or an admin ensuring smooth operations, TripSync brings
              everyone together in one dynamic ecosystem. At TripSync, our
              mission is to simplify travel planning and create a transparent,
              engaging, and rewarding platform for all users. We believe in
              fostering connections, building trust, and providing tools that
              make travel accessible and enjoyable for everyone.
            </text>
            <img src={aboutUs} className="aboutUsPhoto"></img>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default Home;
