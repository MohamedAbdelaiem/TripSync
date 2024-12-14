import "./OurStory.css";
import SidNavBar from "../../Components/SideNavBar/SideNavBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const OurStory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const role = queryParams.get("type"); // "travel_agency"
  const userId = queryParams.get("userId"); // "103"

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTravelAgencyDetails = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDescription(response.data.data[0].description);
      setName(response.data.data[0].username);
    } catch (error) {
      console.error("Error fetching travel agency data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelAgencyDetails();
  }, [userId]);

  const updatedData = { name, description };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/updateMe`,
        { description: updatedData.description, name: updatedData.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated data:", updatedData);
      console.log("Response:", response);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving updated travel agency data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      {/* Pass userId and role to SidNavBar */}
      <SidNavBar type={role} userId={userId}></SidNavBar>

      <div className="about-us">
        <h1 className="header-title">
          {isEditing && role === "travel_agency" ? (
            <input
              type="text"
              className="edit-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
        </h1>
        <div className="header-underline"></div>
        <div className="description">
          {isEditing && role === "travel_agency" ? (
            <textarea
              className="edit-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          ) : (
            description
          )}
        </div>
        {role === "travel_agency" && (
          <div className="edit-controls">
            {isEditing ? (
              <>
                <button className="btn save-btn" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurStory;
