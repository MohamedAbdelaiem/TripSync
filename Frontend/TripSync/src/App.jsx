import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/Sign_in/Sign_in";
import Register from "./pages/Register/Register";
import Preregister from "./pages/Preregister/Preregister";
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

<<<<<<< HEAD
        <main>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sign_in" element={<Sign_in />} />
            <Route path="/Preregister/Register" element={<Register />} />
            <Route path="/Preregister" element={<Preregister />} />
          </Routes>
        </main>
      </BrowserRouter>
=======
>>>>>>> 42d88e47bfe4ff214fca17193408bf33ec140adb
    );
  }
}

export default App;
