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
import Blogs from "./pages/Blogs/Blogs";
import Review from "./pages/Review/Review";
export class App extends Component {
  render() {
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

            <Route path="/Traveller-Profile" element={<TravellerProf />} />
            <Route path="/Tickets/:id" element={<TicketsList />} />
            <Route path="/Rewards/:id" element={<RewardsList />} />

            <Route path="/TravelAgency" element={<TravelAgency />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Blog" element={<Blogs />} />
            <Route path="/Tours" element={<Tours/>} />
            <Route path="/Story" element={<OurStory/>} />
            {/* <Route path="/Sign_in/ForgetPassword" element={<OurStory/>} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
