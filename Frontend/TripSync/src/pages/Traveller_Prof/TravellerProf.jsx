import SideBar from "../../Components/trav-prof/SideBar/SideBar.jsx";
import RestProf from "../../Components/trav-prof/RestProf/RestProf.jsx";
import "./TravellerProf.css"
const tickets = [
  {
    id: 1,
    tripName: "Beach Getaway",
    bookingDate: "2024-11-20",
    startDate: "2024-12-01",
    hasStarted: false,
    seatsBooked: 2,
    price: 150,
    imageUrl:
      "https://t4.ftcdn.net/jpg/01/96/99/03/240_F_196990370_mIPZ4fBBdYjcJV5nk09unnaegf9WKxVx.jpg",
    travellerId: "T12345",
    tripId: "TR67890",
    travellerName: "Hazem Ahmed",
  },
  {
    id: 2,
    tripName: "Mountain Adventure",
    bookingDate: "2024-11-15",
    startDate: "2024-11-25",
    hasStarted: true,
    seatsBooked: 4,
    price: 300,
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/80/82/81/240_F_280828158_ZZ2W8atYMHiSkLoDzxgDHNhdmXJ31jCR.jpg",
    travellerId: "T12345",
    tripId: "TR67890",
    travellerName: "hassan sayed",
  },
];
function TravellerProf(props) {
  let userID = 123
  let profile_name = "Hazem Emam";
  let points = 10;
  let noOfTrips = 20;
  let image_url =
    "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png";
  return (
    <>
      <div className="Profile-container">
        <SideBar imgUrl={image_url} profName={profile_name} userID={userID}></SideBar>
        <RestProf profName={profile_name} points = {points} noOfTrips={noOfTrips} ></RestProf>
      </div>
    </>
  );
}

export default TravellerProf;
