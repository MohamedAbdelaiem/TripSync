import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NavbarSignedIn from "../../Components/NavbarSignedIn/NavbarSignedIn";
import aboutUs from "../../assets/About us.png";
import video from "../../assets/video.mp4";
import Footer from "../../Components/Footer/Footer";
import PhotoSlider from "../../Components/Photos_Slider/Photos_Slider";
import PhotosToSlide from "../../Components/PhotosToSlide/PhotosToSlide";
import "./Home.css";
import { UserContext } from "../../assets/userContext";

// Import service and contact images


// Import icons
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane 
} from 'react-icons/fa';

const Home = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const services = [
    {
      title: "Personalized Travel Planning",
      description: "Tailored itineraries that match your unique travel style and preferences.",
      image: "https://images.pexels.com/photos/1660194/pexels-photo-1660194.jpeg"
    },
    {
      title: "Group Tours",
      description: "Exciting group adventures that connect you with like-minded travelers.",
      image: "https://images.pexels.com/photos/1649761/pexels-photo-1649761.jpeg"
    },
    {
      title: "Custom Experiences",
      description: "Unique, off-the-beaten-path experiences crafted just for you.",
      image: "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Budget-Friendly Travel",
      description: "Affordable travel options without compromising on quality and experience.",
      image: "https://images.pexels.com/photos/7009468/pexels-photo-7009468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Adventure Tours",
      description: "Thrilling expeditions for the adrenaline seekers and nature lovers.",
      image: "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Luxury Packages",
      description: "Premium travel experiences with top-tier accommodations and services.",
      image: "https://images.pexels.com/photos/29731400/pexels-photo-29731400/free-photo-of-louvre-pyramid-illuminated-at-night-in-paris.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div id="home_id">
      {token ? (
        <NavbarSignedIn id={"#about_id"} />
      ) : (
        <Navbar id={"#about_id"} />
      )}
      
      <video autoPlay muted loop className="video-player">
        <source src={video} type="video/mp4" />
      </video>
      <div className="text-overlay">Enjoy Your Dream Vacation</div>
      
      <PhotosToSlide />
      
      <div className="containerAboutUs" id="about">
        <h3 className="head2">About us</h3>
        <div className="AboutUs" id="about_id">
          <p className="txt1">
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
          </p>
          <img src={aboutUs} className="aboutUsPhoto" alt="About Us" />
        </div>
      </div>

      <div className="services-container" id="services">
        <h3 className="head2">Our Services</h3>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img 
                src={service.image} 
                alt={service.title} 
                className="service-image" 
              />
              <div className="service-content" >
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="contact-container" id="contact">
        <h3 className="head2">Contact Us</h3>
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-details">
              <h4>Contact Information</h4>
              <div className="contact-item">
                <FaEnvelope className="contact-icon"/>
                <div>
                  <span>Email</span>
                  <p>tripSync@gmail.com</p>
                  <p>tripSync@yahoo.com</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon"/>
                <div>
                  <span>Phone</span>
                  <p>+02 112-713-3855</p>
                  <p>+02 112-007-1030</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon"/>
                <div>
                  <span>Address</span>
                  <p>123 Travel Street</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <h4>Send us a Message</h4>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="send-btn">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;