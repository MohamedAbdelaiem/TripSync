import "./SideBar.css";
import "./../../../pages/Traveller_Prof/TravellerProf.css";
import ProfPicture from "../ProfPicture/ProfPicture";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../EditTravProfile/EditTravProfModal";

function SideBar(props) {
  const navigate = useNavigate();

  // function Trips_clicked() {
  //   console.log("notification_clicked");
  //   navigate(`/User_Trips/${props.userID}`);
  // }

  // function Tickets_clicked() {
  //   console.log("notification_clicked");
  //   navigate(`/Tickets/${props.userID}`);
  // }

  function Edit_clicked() {
    console.log("notification_clicked");
  }
  // function Points_clicked() {
  //   console.log("notification_clicked");
  // }
  // function MyRewards_clicked() {
  //   console.log("notification_clicked");
  //   navigate(`/Rewards/${props.userID}`);
  // }
  return (
    <div className="Side-Bar">
      <ul className="sidebar-menu">
        <li>
          <ProfPicture
            imgPath={props.imgUrl}
            profName={props.profName}
          ></ProfPicture>
        </li>
        <li onClick={props.openMessages}>
          Messages &nbsp;<i className="fa-regular fa-message"></i>
        </li>
        <li onClick={props.openEditProfModal}>
          Edit Profile &nbsp; <i className="fa-regular fa-pen-to-square"></i>
        </li>

        <a
          href="#user-rewards"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>
            My Rewards &nbsp; <i className="fa-solid fa-ticket"></i>
          </li>
        </a>

        <a
          href="#user-trips"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>
            Trips &nbsp; <i className="fa-solid fa-ticket"></i>
          </li>
        </a>

        <a
          href="#user-tickets"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>
            Tickets &nbsp; <i className="fa-solid fa-ticket"></i>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default SideBar;

SideBar.propTypes = {
  imgUrl: PropTypes.string,
  profName: PropTypes.string,
};
