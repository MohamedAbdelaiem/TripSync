import  { Component } from 'react'
import AgencyNav from '../../Components/AgencyNav/AgencyNav'
import AgencyFooter from '../../Components/AgencyFooter/AgencyFooter';
import TourCardContainer from '../../Components/TourCardContainer/TourCardContainer';
import './Tours.css'
export class Tours extends Component {
    render() {
      return (
        <>
          {/* < className="navbar"><Navbar/></> */}
          <div className='flex'>
          <AgencyNav></AgencyNav>
         <TourCardContainer></TourCardContainer>
         <AgencyFooter></AgencyFooter>
          </div>
      
        </>
      )
    }
  }
  
  export default Tours