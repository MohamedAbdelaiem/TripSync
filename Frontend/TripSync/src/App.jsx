import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/Sign_in/Sign_in";
import Register from "./pages/Register/Register";
import TravellerProf from "./pages/Traveller_Prof/TravellerProf";
import TicketsList from "./pages/TicketList/TicketList";
import RewardsList from "./pages/RewardsList/RewardsList";



export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sign_in" element={<Sign_in />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Traveller-Profile" element={<TravellerProf />} />
            <Route path="/Tickets/:id" element={<TicketsList/>} />
            <Route path="/Rewards/:id" element={<RewardsList/>} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
