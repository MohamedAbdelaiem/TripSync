import "./SideBar.css";
import "./../../../pages/Traveller_Prof/TravellerProf.css";
import ProfPicture from "../ProfPicture/ProfPicture";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../assets/userContext";
import EditProfileModal from "../EditTravProfile/EditTravProfModal";

function SideBar(props) {
  const navigate = useNavigate();

  let current_user_is_owner = props.isOwner;

  const GoToHomePage = () => {
    navigate("/");
  }
  return (
    <div className="Side-Bar">
      <ul className="sidebar-menu">
        <button className="return-home-from-trav-prof" onClick={GoToHomePage}>
          <i className="fa-solid fa-arrow-left"></i> Home
        </button>
        <li>
          <ProfPicture
            imgPath={props.imgUrl}
            profName={props.profName}
          ></ProfPicture>
        </li>
        <li onClick={props.openMessages}>
          Messages &nbsp;<i className="fa-regular fa-message"></i>
        </li>
        {current_user_is_owner && (
          <li onClick={props.openEditProfModal}>
            Edit Profile &nbsp; <i className="fa-regular fa-pen-to-square"></i>
          </li>
        )}

        <a
          href="#user-rewards"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>
            My Rewards &nbsp; <i className="fa-solid fa-award"></i>
          </li>
        </a>

        <a
          href="#user-trips"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>
            Trips &nbsp; <i className="fa-solid fa-plane"></i>
          </li>
        </a>

        {current_user_is_owner && (
          <a
            href="#user-tickets"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>
              Tickets &nbsp; <i className="fa-solid fa-ticket"></i>
            </li>
          </a>
        )}
      </ul>
    </div>
  );
}

export default SideBar;

SideBar.propTypes = {
  imgUrl: PropTypes.string,
  profName: PropTypes.string,
};
