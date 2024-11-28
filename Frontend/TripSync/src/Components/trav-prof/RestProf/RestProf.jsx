import "./RestProf.css";
import PropTypes from "prop-types";
import "./../../../pages/Traveller_Prof/TravellerProf.css";

function RestProf(props) {

  return (
    <>
      <div className="RestProf-container">
        <h1 className="greeting-message">Welcome to {props.profName} Profile 👋</h1>

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
      </div>
    </>
  );
}

export default RestProf;
