import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/Sign_in/Sign_in";
import Register from "./pages/Register/Register";
import TicketSystem from "./pages/Ticket/Ticket";

export class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      
      //   <main>
      //     {/* Define Routes */}
      //     <Routes>
      //       <Route path="/" element={<Home />} />
      //       <Route path="/Sign_in" element={<Sign_in />} />
      //       <Route path="/Register" element={<Register />} />
      //     </Routes>
      //   </main>
      // </BrowserRouter>
      <TicketSystem />

    );
  }
}

export default App;
