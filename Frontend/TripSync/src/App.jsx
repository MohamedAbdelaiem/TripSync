import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/Sign_in/Sign_in";
import Register from "./pages/Register/Register";
import Preregister from "./pages/Preregister/Preregister";
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
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
