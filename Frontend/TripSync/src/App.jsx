import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/Sign_in/Sign_in";
import Register from "./pages/Register/Register";
import OurStory from "./pages/OurStory/OurStory";
import TravellerProf from "./pages/Traveller_Prof/TravellerProf";
import TicketsList from "./pages/TicketList/TicketList";
import RewardsList from "./pages/RewardsList/RewardsList";
import Blog from "./Components/Blog/Blog";
import Preregister from "./pages/Preregister/Preregister";
import TravelAgency from "./pages/TravelAgency/TravelAgency";
import Tours from "./pages/Tours/Tours";
import AdminView from "./pages/AdminView/AdminView";

import UserTripsList from "./pages/UserTripsList/UserTripsList";



import Blogs from "./pages/Blogs/Blogs";
import Review from "./pages/Review/Review";
import QACards from "./pages/QACards/QACards"; 
import TravelAgencyProfile from "./pages/TravelAgencyProfile/TravelAgencyProfile";
import AddNewTour from './Pages/AddNewTour/AddNewTour';

export class App extends Component {
  render() {
    const agency = {
      TravelAgencyID: "001",
      Username: "holiday_travel",
      ProfilePicture: "https://via.placeholder.com/150",
      ProfileName: "Holiday Travel Agency",
      Address: "123 Nile Avenue, Cairo",
      Location: "Cairo, Egypt",
      Rate: "4.8/5",
      Description: "A leading travel agency specializing in premium travel services.",
      Mail: "contact@holidaytravel.com",
      Phone: "+20 123 456 7890",
      Country: "Egypt",
      role:"travel_agency",
    };
    return (
      <BrowserRouter>
        <main>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sign_in" element={<Sign_in />} />
            <Route path="/Preregister/Register" element={<Register />} />
            <Route path="/Preregister" element={<Preregister />} />
            <Route path="/Blog/profile" element={<TravelAgency />} />

            <Route path="/Traveller-Profile/:id" element={<TravellerProf />} />
            <Route path="/Admin-view/:adminId" element={<AdminView />} />
            <Route path="//trip-details/:tripId" element={<AdminView />} />
            {/* <Route path="/Tickets/:id" element={<TicketsList/>} />
            <Route path="/Rewards/:id" element={<RewardsList/>} />
            <Route path="/User_Trips/:id" element={<UserTripsList/>} /> */}

            <Route path="/TravelAgency" element={<TravelAgency />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Blog" element={<Blogs />} />
            <Route path="/Tours" element={<Tours />} />
            <Route path="/Story" element={<OurStory />} />
            <Route path="/Q&A" element={<QACards />} />
            <Route
              path="/TravelAgencyProfile"
              element={<TravelAgencyProfile agency={agency} />}
            />
            <Route path="/add-new-tour" element={<AddNewTour />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
