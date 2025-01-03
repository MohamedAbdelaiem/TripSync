import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useContext,useEffect } from "react";
import { UserContext } from "./assets/userContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home/Home";
import Sign_in from "./pages/sign_in/sign_in";
import Register from "./pages/register/register";
import OurStory from "./pages/OurStory/OurStory";
import TravellerProf from "./pages/Traveller_Prof/TravellerProf";
import TicketsList from "./pages/TicketList/TicketList";
// import RewardsList from "./pages/RewardsList/RewardsList";
import Blog from "./Components/Blog/Blog";
import Preregister from "./pages/Preregister/Preregister";
import TravelAgency from "./pages/TravelAgency/TravelAgency";
import Tours from "./pages/Tours/Tours";
import AllTribsListPublic from "./Components/AllTribsList(public)/AllTribsPublic";
import AdminView from "./pages/AdminView/AdminView";
import Register_TravelAgency from "./pages/Register_TravelAgency/Register_TravelAgency";
import BookPage from "./pages/BookPage/BookPage";
import EditTour from "./pages/EditTour/EditTour";
import Report from "./pages/Report/Report";
import BlogWrite from "./pages/BlogWrite/BlogWrite";
import Blogs from "./pages/Blogs/Blogs";
import Review from "./pages/Review/Review";
import QACards from "./pages/QACards/QACards";
import Policy from "./pages/Policy/Policy";
import TravelAgencyProfile from "./pages/TravelAgencyProfile/TravelAgencyProfile";
import ReviewCard from "./Components/reviewCard/reviewCard";
import AddNewTour from "./Pages/AddNewTour/AddNewTour";
import NotFound from "./pages/NotFound/NotFound";
import image2 from "./assets/card.jpg";
import image3 from "./assets/Rectangle 9.png";
import image4 from "./assets/Rectangle 11.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllAgencies from "./pages/AllAgencies/AllAgencies";
import AgencyToursPage from "./pages/AgencyToursPage/AgencyToursPage "; // Import your AgencyToursPage
import TripDetailsPage from "./Components/trav-prof/TripsCard/TripDetailsPage/TripDetailsPage";
const App = () => {
  const agency = {
    TravelAgencyID: "001",
    Username: "holiday_travel",
    ProfilePicture: "https://via.placeholder.com/150",
    ProfileName: "Holiday Travel Agency",
    Address: "123 Nile Avenue, Cairo",
    Location: "Cairo, Egypt",
    Rate: "4.8/5",
    Description:
      "A leading travel agency specializing in premium travel services.",
    Mail: "contact@holidaytravel.com",
    Phone: "+20 123 456 7890",
    Country: "Egypt",
    role: "traveller",
  };

  const [tours, setTours] = useState([
    {
      id: 1,
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2, image3, image4],
      hasSale: true,
      salePrice: 300,
    },
    {
      id: 2,
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2, image3, image4],
      hasSale: false,
      // salePrice: 300,
    },
    {
      id: 3,
      description: "Explore the White Desert",
      price: 400,
      maxSeats: 50,
      destination: "White Desert",
      duration: 5,
      startLocation: "Cairo",
      images: [image2, image3, image4],
      hasSale: true,
      salePrice: 300,
    },
  ]);

  const addTour = (newTour) => {
    setTours((prevTours) => [...prevTours, newTour]);
  };
  const handleDeleteTour = (tourId) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== tourId));
  };
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign_in" element={<Sign_in />} />
          <Route path="/Preregister/Register" element={<Register />} />
          <Route
            path="/Preregister/Register_TravelAgency"
            element={<Register_TravelAgency />}
          />
          <Route path="/Preregister" element={<Preregister />} />
          <Route path="/Blog/profile" element={<TravelAgency />} />
          <Route path="/ALLAgencies" element={<AllAgencies />} />
          <Route path="/agency-tours" element={<AgencyToursPage />} />
          <Route path="/Traveller-Profile/:profile_id" element={<TravellerProf />} />
          <Route path="/Tickets/:id" element={<TicketsList />} />
          <Route path="/Admin-view/:adminId" element={<AdminView />} />
          {/* <Route path="/Rewards/:id" element={<RewardsList />} /> */}
          <Route path="/TravelAgency" element={<TravelAgency />} />
          <Route path="/Review/:user_id" element={<Review />} />
          <Route path="/Report/:user_id" element={<Report />} />
          <Route path="/Report/policy" element={<Policy />} />
          <Route path="/Blog" element={<Blogs />} />
          <Route path="/Blog/ALLAgencies" element={<AllAgencies />} />
          <Route path="/ALLAgencies/Blog" element={<Blogs />} />
          <Route path="/ALLAgencies/Blog" element={<Blogs />} />
          <Route path="/blogWrite" element={<BlogWrite />} />
          <Route path="/Story/:user_id" element={<OurStory />} />
          {/* <Route path="/Story/:role/:id" element={<OurStory />} /> */}
          <Route path="/Q&A/:user_id" element={<QACards />} />
          <Route path="/policy" element={<Policy />} />
          {/* <Route
            path="/TravelAgencyProfile"
            element={<TravelAgencyProfile agency={agency} />}
          /> */}
          <Route path="/travel-agency/:id" element={<TravelAgencyProfile />} />
          <Route path="/travel-agency" element={<TravelAgencyProfile />} />
          <Route path="/trip-details/:trip_id" element={<TripDetailsPage />} />
          <Route
            path="/tours/:user_id"
            element={
              <Tours
                tours={tours}
                addTour={addTour}
                onDeleteTour={handleDeleteTour}
              />
            }
          />
          <Route
            path="/add-new-tour"
            element={<AddNewTour addTour={addTour} />}
          />
          <Route path="/book" element={<BookPage />} />
          <Route path="/edit-tour" element={<EditTour />} />
          <Route path="/Blog/blogWrite" element={<BlogWrite />} />

          {/* ReviewCard */}
          <Route path="/ReviewCard" element={<ReviewCard />} />

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />

          {/*Trips*/}
          <Route path="/AllTripsList" element={<AllTribsListPublic />} />
          
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
