import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../assets/userContext";
import "./EditTravProfModal.css";

const EditTravProfModal = (props) => {
  const [formData, setFormData] = useState({
    profile_name: "",
    email: "",
    password: "",
    profilePicture: null,
    previousPassword: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const { user, setUser } = useContext(UserContext);
  // const [fail, setFail] = useState(true);
  // const [success, setsuccess] = useState(false);
  // const [popMessageContent, setPopMessageContent] = useState("");

  async function handlesImage(filex) {
    const file = filex;
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dxm7trzb5/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "TripSync"); // Cloudinary upload preset
      data.append("cloud_name", "dxm7trzb5"); // Cloudinary cloud name

      const response = await axios.post(CLOUDINARY_URL, data);
      const urlimage = response.data;

      setProfilePhoto(urlimage.url);
      return urlimage.url;
    } else {
      return null;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      alert("please select an image (jpeg / jpg)");
      setFormData({ ...formData, profilePicture: null });
      e.target.value = null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.profile_name &&
      !formData.email &&
      !formData.password &&
      !formData.previousPassword &&
      !formData.profilePicture
    ) {
      alert("Please fill at least one field");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const url = await handlesImage(formData.profilePicture);

      await axios.patch(
        "http://localhost:3000/api/v1/users/updateMe",
        {
          profilephoto: url,
          useremail: formData.email,
          newPassword: formData.password,
          previousPassword: formData.previousPassword,
          profilename: formData.profile_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.showPopUp("Profile Updated Successfully", "success");
      setTimeout(() => {
        props.rerender();
      }, 3000);
      setUser({
        ...user,
        email: formData.email,
        profilename: formData.profile_name,
        profilephoto: url,
      });


    } catch (err) {
      console.log(err);
      props.showPopUp("please check for the enterd data", "fail");
      setTimeout(() => {
        props.closeEditprofModal(); // Close the modal after submitting
        props.rerender();
        return;
      }, 3000);
    }
    props.closeEditprofModal(); // Close the modal after submitting
  };
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            profile name:
            <input
              type="text"
              name="profile_name"
              value={formData.profile_name}
              onChange={handleInputChange}
              placeholder="Enter new profile name"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter new email"
            />
          </label>

          <label>
            previous Password:
            <input
              type="password"
              name="previousPassword"
              value={formData.previousPassword}
              onChange={handleInputChange}
              placeholder="Enter previous password"
            />
          </label>

          <label>
            password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </label>

          <label>
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              accept=".jpeg, .jpg"
              onChange={handleFileChange}
            />
          </label>

          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={props.closeEditprofModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* {(fail || success) && <PopupMessage content={popMessageContent} status={fail?"fail":"success"} />} */}
    </div>
  );
};

export default EditTravProfModal;