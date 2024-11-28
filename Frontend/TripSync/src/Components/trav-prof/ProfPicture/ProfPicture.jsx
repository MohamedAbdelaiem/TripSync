import "./ProfPicture.css";
import PropTypes from "prop-types";
function ProfPicture(props) {
  let imagePath = props.imgPath;
  if (!imagePath) {
    imagePath = "./unkonwn_prof_picture.jpg";
  }
  return (
    <>
      <div className="profile-container">
        <div className="profile-picture">
          <img src={imagePath} alt="Profile Picture"></img>
        </div>
        <h2 className="profile-name">{props.profName}</h2>
      </div>
    </>
  );
}

export default ProfPicture;
ProfPicture.propTypes = {
  imgPath: PropTypes.string,
  profName: PropTypes.string,
};
