import "./RestProf.css";
import PropTypes from "prop-types";
import "./../../../pages/Traveller_Prof/TravellerProf.css";
import EligibleRewards from "../UserRewards/EligibleRewards";
import UserTrips from "../UserTrips/UserTrips";
import UserTickets from "../UserTickets/UserTickets";

function RestProf(props) {
  let current_user_is_owner = props.isOwner;
  return (
    <>
      <div className="RestProf-container">
        <div className="welcome-container">
          <h1 className="welcome-text">
            Welcome to{" "}
            <span className="highlighted-name">{props.profName}</span> Profile{" "}
            <span className="wave-emoji">👋</span>
          </h1>
        </div>

        <div className="user-stats">
          <div className="stat-box">
            <div className="stat-icon">
              <i className="fas fa-coins"></i>
            </div>
            <h3>Points</h3>
            <p>{props.points}</p>
          </div>
          <div className="stat-box">
            <div className="stat-icon">
              <i className="fas fa-plane"></i>
            </div>
            <h3>Trips</h3>
            <p>{props.noOfTrips}</p>
          </div>
        </div>
        {current_user_is_owner && (
          <EligibleRewards
            rewards={props.all_rewards}
            userPoints={props.points}
          />
        )}
        <UserTrips userID={props.profileID} trips={props.all_trips} />
        {current_user_is_owner && (
          <UserTickets userID={props.profileID} tickets={props.all_tickets} />
        )}
      </div>
    </>
  );
}

export default RestProf;
