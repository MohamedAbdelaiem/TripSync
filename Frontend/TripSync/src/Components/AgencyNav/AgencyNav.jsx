//import React from 'react';
import './AgencyNav.css'
import image2 from '../../assets/holidaytoursbiglogoGIF.gif';

const AgencyNav = () => {
    return (<>
    <nav>
   <div className="logo">
    <img src={image2} alt="Holiday Tours Logo"/>
   </div>
  <div className="nav-links">
    <a href="#Home">HOME</a>
    <a href="#">OUR STORY</a>
    <a href="#">TOURS</a>
    <a href="#">BLOG</a>
    <a href="#">CONTACT</a>
  </div>
</nav>
 
      </>
  );
};

export default AgencyNav