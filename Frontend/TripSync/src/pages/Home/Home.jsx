import  { Component } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import image1 from '../../assets/Rectangle 2.png';
import './Home.css'
export class Home extends Component {
  render() {
    return (<>
        <Navbar />
      <img src={image1} className="image-container mx-auto d-block m-3" width={1400} height={600} />
        <div className="text-overlay">Enjoy Your Dream Vacation</div>
        <div className="text-overlay-sub">Embark on your next adventure with ease—discover the world most breathtaking destinations and exclusive travel experiences, tailored just for you! </div>
        <div className="text-overlay-sub">Unlock endless possibilities for your clients—partner with us to offer curated travel experiences, seamless bookings, and unforgettable journeys! </div>
        </>
    )
  }
}

export default Home