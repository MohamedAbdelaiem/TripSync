import  { Component } from 'react'
import SideNavBar from '../../Components/SideNavBar/SideNavBar';
import TourCardContainer from '../../Components/TourCardContainer/TourCardContainer';
import './Tours.css'
export class Tours extends Component {
    render() {
      return (
        <>
          {/* < className="navbar"><Navbar/></> */}
          <div className='flex'>
         <SideNavBar></SideNavBar>
         <TourCardContainer></TourCardContainer>
          </div>
      
        </>
      )
    }
  }
  
  export default Tours