// import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'
import planeImage from '../../assets/plane.png';

const Footer = () => {
    return (<>
    <footer>
  <div className="footer-container">
    <div className="footer-section">
    <a className="navbar-brand mb-0 h4 mx-3" href="#">
            <img className='d-inline-block align-top mx-1 mt-1'
                   src={planeImage} width={20} height={20} />
                My Dream Place
            </a>
            <p className="description">Your next goto companion for travel</p>
          
    </div>
    <div className="footer-section">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Newsroom</a></li>
        <li><a href="#">Advertising</a></li>
        <li><a href="#">Contact us</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Explore</h4>
      <ul>
        <li><a href="#">Australia</a></li>
        <li><a href="#">New Zealand</a></li>
        <li><a href="#">United States of America (USA)</a></li>
        <li><a href="#">Greece</a></li>
        <li><a href="#">Maldives</a></li>
        <li><a href="#">Singapore</a></li>
        <li><a href="#SeeMore">See more</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Terms and Policies</h4>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of use</a></li>
        <li><a href="#">Accessibility</a></li>
        <li><a href="#">Reward system policy</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Help</h4>
      <ul>
        <li><a href="#">Support</a></li>
        <li><a href="#">Cancel your bookings</a></li>
        <li><a href="#">Use Coupon</a></li>
        <li><a href="#">Refund Policies</a></li>
        <li><a href="#">International Travel Documents</a></li>
      </ul>
    </div>
  </div>
</footer>
  </>
  )
}

export default Footer