import "./SideBar.css";
import "./../../../pages/Traveller_Prof/TravellerProf.css"
import ProfPicture from "../ProfPicture/ProfPicture";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const navigate = useNavigate();
  function Trips_clicked() {
    console.log("notification_clicked");
  }

  function Tickets_clicked() {
    console.log("notification_clicked");
    navigate(`/Tickets/${props.userID}`);
  }


  function Edit_clicked() {
    console.log("notification_clicked");
  }
  function Points_clicked() {
    console.log("notification_clicked");
  }
  function MyRewards_clicked() {
    console.log("notification_clicked");
    navigate(`/Rewards/${props.userID}`)
  }
  return (
    <div className="Side-Bar">
      <ul className="sidebar-menu">
        <li>
          <ProfPicture
            imgPath={props.imgUrl}
            profName={props.profName}
          ></ProfPicture>
        </li>
        <li>
          Messages &nbsp;<i className="fa-regular fa-message"></i>
        </li>
        <li onClick={Tickets_clicked}>
          Tickets &nbsp; <i className="fa-solid fa-ticket"></i>
        </li>
        <li>
          Trips &nbsp; <i className="fa-solid fa-plane"></i>
        </li>
        <li>
          Edit Profile &nbsp; <i className="fa-regular fa-pen-to-square"></i>
        </li>
        <li onClick={MyRewards_clicked}>
          My Rewards &nbsp; <i className="fa-solid fa-trophy"></i>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

SideBar.propTypes = {
  imgUrl: PropTypes.string,
  profName: PropTypes.string,
};
