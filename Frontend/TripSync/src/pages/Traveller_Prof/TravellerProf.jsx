import SideBar from "../../Components/trav-prof/SideBar/SideBar.jsx";
import RestProf from "../../Components/trav-prof/RestProf/RestProf.jsx";
import "./TravellerProf.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { all_Travellers } from "../../Components/Data/all_Travellers.js";
import { all_rewards } from "../../Components/Data/Rewards.js";
import { all_user_trips } from "../../Components/Data/all_user_trips.js";
import { all_tickets } from "../../Components/Data/tickets.js";
import { all_messages } from "../../Components/Data/all_messages.js";
import EditTravProfModal from "../../Components/trav-prof/EditTravProfile/EditTravProfModal.jsx";
import UserMessages from "../../Components/trav-prof/UserMessages/UserMessages.jsx";

function TravellerProf(props) {
  const [travellerID, setTravellerID] = useState(null);
  const [traveller, setTraveller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [messagesAreOpened, setMessagesAreOPened] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setTravellerID(id);
    const get_traveller = () => {
      setIsLoading(true);
      const t = all_Travellers.filter((trav) => trav.userID == id)[0];
      setTraveller(t);
      setIsLoading(false);
    };

    get_traveller();
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
            imgUrl={traveller.image_url}
            profName={traveller.profile_name}
            userID={traveller.userID}
            openEditProfModal={openModal}
            openMessages = {openMessages}
          ></SideBar>
          <RestProf
            profName={traveller.profile_name}
            points={traveller.points}
            noOfTrips={traveller.noOfTrips}
            all_rewards={all_rewards}
            all_trips={all_user_trips}
            all_tickets={all_tickets}
            userID={traveller.userID}
          ></RestProf>
          {modalIsOpened && <EditTravProfModal closeEditprofModal={closeModal} />}
          <UserMessages isOpen={messagesAreOpened} userID={traveller.userID} allMessages={all_messages} onClose={closeMessages} />
        </div>
      </>
    );
}

export default TravellerProf;
