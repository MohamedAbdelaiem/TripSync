import SideBar from "../../Components/trav-prof/SideBar/SideBar.jsx";
import RestProf from "../../Components/trav-prof/RestProf/RestProf.jsx";
import axios from "axios";
import "./TravellerProf.css";
import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { all_Travellers } from "../../Components/Data/all_Travellers.js";
import { all_rewards } from "../../Components/Data/Rewards.js";
import { all_user_trips } from "../../Components/Data/all_user_trips.js";
import { all_tickets } from "../../Components/Data/tickets.js";
import { all_messages } from "../../Components/Data/all_messages.js";
import EditTravProfModal from "../../Components/trav-prof/EditTravProfile/EditTravProfModal.jsx";
import UserMessages from "../../Components/trav-prof/UserMessages/UserMessages.jsx";
import { UserContext } from "../../assets/userContext";



function TravellerProf(props) {
  const [travellerID, setTravellerID] = useState(null);
  const [traveller, setTraveller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [messagesAreOpened, setMessagesAreOPened] = useState(false);
  const [rewards,setRewards]=useState([]);

  // let { id } = useParams();
  const {user,setUser} = useContext(UserContext);
  console.log(user);
  // const user={
  //       user_id: 74,
  //       email: "user5@gmilsssss.com",
  //       profilephoto: null,
  //       profilename: null,
  //       role: "traveller",
  //       username: "user5",
  //       points: 0,
  //       numberoftrips: 0
  // }
  let id=user.user_id;
  
  
  const getRewards=async()=>{
    try{
    const token = localStorage.getItem("token");
    const response=await axios.get("http://localhost:3000/api/v1/users/myProfile/rewards",{
      headers:{
        "Authorization":`Bearer ${token}`
      },
      withCredentials:true
    });
    console.log(response.data);
    setRewards(response.data);
    
  }
  catch(error){
    console.log(error);
    }
  };
  
  const get_traveller = async() => {
    setIsLoading(true);
    try{
    const token = localStorage.getItem("token");
    // const t = all_Travellers.filter((trav) => trav.userID == id)[0];
    // setTraveller(t);
    const response=await axios.get("http://localhost:3000/api/v1/users/myProfile",{
      headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials:true
    });
    setIsLoading(false);
    setTraveller(response.data.data[0]);
  }
  catch(error){
    console.log(error);
    setIsLoading(false);
  }
  };
  
  
  useEffect(() => {
    // setTravellerID(id);
    get_traveller();
    // setTraveller(user);
    getRewards();
  }, []);



  const openModal = () => { setModalIsOpened(true) };
  const closeModal = () => { setModalIsOpened(false) };
  const closeMessages = () => { setMessagesAreOPened(false) };
  const openMessages = () => { setMessagesAreOPened(true) };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  } else
    return (
      <>
        <div className="Profile-container">
          <SideBar
            profName={traveller.profilename}
            imgUrl={traveller.profilephoto}
            userID={traveller.user_id}
            openEditProfModal={openModal}
            openMessages = {openMessages}
          ></SideBar>
          <RestProf
            profName={traveller.profilename}
            points={traveller.points}
            noOfTrips={traveller.numberoftrips}
            all_rewards={rewards}
            all_trips={all_user_trips}
            all_tickets={all_tickets}
            userID={traveller.user_id}
          ></RestProf>
          {modalIsOpened && <EditTravProfModal closeEditprofModal={closeModal} />}
          <UserMessages isOpen={messagesAreOpened} userID={traveller.user_id} allMessages={all_messages} onClose={closeMessages} />
        </div>
      </>
    );
}

export default TravellerProf;
