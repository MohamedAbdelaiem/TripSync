
import './AgencyFooter.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const AgencyFooter = () => {
  return (
    <footer className="footer">
      <div className="top-section"> 
        <div className="contact-info">
            <div className='flex'>
            <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'green', fontSize: '24px' }} />
            <p><strong>Chat With Us</strong></p>
            </div>
         
          <p>+20 10673 25002</p>
          <p>Booking Time: 09.00-18.00 hrs (GMT+3)</p>
        </div>
        <div className="contact-info">
            <div className="flex">  <FontAwesomeIcon icon={faEnvelope} style={{ color: 'blue', fontSize: '24px', margin: '0 15px' }} />
            <p><strong>Send an Email</strong></p></div>
      
          <p>sales@holidaytours.one</p>
          <p>Send your request and fill in your Inquiry Contact.</p>
        </div>
        <div className="contact-info">
            <div className="flex"> <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'red', fontSize: '24px' }} />
            <p><strong>Office Address</strong></p></div>
       
          <p>Our Location</p>
          <p>14 Mohammed Bek Al Alfi st., Downtown, Cairo, Egypt</p>
        </div>
      </div>
      <div className="bottom-section">
        <p>&copy; 2023 Holiday Tours - Travel Agency in Egypt. All rights reserved. Built by Digital Marketing Consultant</p>
      </div>
    </footer>
  );
};

export default AgencyFooter;