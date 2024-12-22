import SideBar from "../../Components/trav-prof/SideBar/SideBar.jsx";
import RestProf from "../../Components/trav-prof/RestProf/RestProf.jsx";
import axios from "axios";
import "./TravellerProf.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { all_Travellers } from "../../Components/Data/all_Travellers.js";
import { all_rewards } from "../../Components/Data/Rewards.js";
// import { all_tickets } from "../../Components/Data/tickets.js";
import { all_messages } from "../../Components/Data/all_messages.js";
import EditTravProfModal from "../../Components/trav-prof/EditTravProfile/EditTravProfModal.jsx";
import UserMessages from "../../Components/trav-prof/UserMessages/UserMessages.jsx";
import { UserContext } from "../../assets/userContext";

function TravellerProf(props) {
  const [traveller, setTraveller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [messagesAreOpened, setMessagesAreOPened] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [all_user_trips, set_all_user_trips] = useState([]);
  const [all_user_tickets, set_all_user_tickets] = useState([]);
  const [traveller_own_rewards, set_traveller_own_rewards] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [fail, setFail] = useState(false);
  const [success, setsuccess] = useState(false);
  const [popMessageContent, setPopMessageContent] = useState("");
  const togglePoppUp = (content, status) => {
    setShowPopup(!showPopup);
    setsuccess(status === "success" ? true : false);
    setFail(status === "success" ? false : true);
    setPopMessageContent(content);
  };

  let { profile_id } = useParams();
  console.log(profile_id);
  const { user } = useContext(UserContext);
  console.log(user);

  let id = null;
  if (user !== null) {
    id = user.user_id;
  }

  const getRewards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/rewards/getRewardIcanGet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setRewards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/trips/getTrips/${profile_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      set_all_user_trips(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/myProfile/tickets/getAllTickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // console.log(response.data.date);
      set_all_user_tickets(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_traveller = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      // const t = all_Travellers.filter((trav) => trav.userID == id)[0];
      // setTraveller(t);
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${profile_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setTraveller(response.data.data[0]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const get_traveller_own_rewards = async () => {
    try {
      const token = localStorage.getItem("token");
      // const t = all_Travellers.filter((trav) => trav.userID == id)[0];
      // setTraveller(t);
      const response = await axios.get(
        `http://localhost:3000/api/v1/rewards/myRewards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      console.log(response.data);
      set_traveller_own_rewards(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          get_traveller(),
          getRewards(),
          getTrips(),
          getTickets(),
          get_traveller_own_rewards(),
        ]);
        if (user !== null && profile_id == id) setIsOwner(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const openModal = () => {
    setModalIsOpened(true);
  };
  const closeModal = () => {
    setModalIsOpened(false);
  };
  const closeMessages = () => {
    setMessagesAreOPened(false);
  };
  const openMessages = () => {
    setMessagesAreOPened(true);
  };

  const reRender = () => {
    getRewards();
    get_traveller();
    get_traveller_own_rewards();
    setShowPopup(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  } else if (
    !isLoading &&
    (user === null || traveller === null || traveller.role !== "traveller")
  ) {
    return <div className="user-not-found-message">User not founded</div>;
  }  
  else
    return (
      <>
        <div className="Profile-container">
          <SideBar
            profName={traveller.profilename}
            imgUrl={traveller.profilephoto}
            profileID={profile_id}
            openEditProfModal={openModal}
            openMessages={openMessages}
            isOwner={isOwner}
          ></SideBar>
          <RestProf
            profName={traveller.profilename}
            points={traveller.points}
            noOfTrips={traveller.numberoftrips}
            all_rewards={rewards}
            all_trips={all_user_trips}
            all_tickets={all_user_tickets}
            profileID={profile_id}
            isOwner={isOwner}
            rerender={reRender}
            userOwnedRewards={traveller_own_rewards}
            showPopUp={togglePoppUp}
          ></RestProf>
          {modalIsOpened && (
            <EditTravProfModal
              closeEditprofModal={closeModal}
              rerender={reRender}
              showPopUp={togglePoppUp}
            />
          )}
          <UserMessages
            isOpen={messagesAreOpened}
            profileId={profile_id}
            allMessages={all_messages}
            onClose={closeMessages}
            isOwner={isOwner}
            currentUser={user}
          />
        </div>

        {showPopup && (
          <div className="popup-overlay-Reward-container">
            <div className="popup-overlay-Reward">
              <div className="popup-content-Reward">
                <h5>
                  <span style={{ color: success ? "#1ac136" : "#ff0000" }}>
                    {success ? "successful process" : "un successful process"}
                  </span>
                </h5>
                <p>
                  {popMessageContent} &nbsp;
                  {success ? (
                    <i
                      className="fa-solid fa-check"
                      style={{
                        color: "#1ac136",
                        fontSize: "2rem",
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-x"
                      style={{
                        color: "#ff0000",
                        fontSize: "2rem",
                      }}
                    ></i>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default TravellerProf;
