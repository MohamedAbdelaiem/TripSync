import "./OurStory.css";
import SidNavBar from "../../Components/SideNavBar/SideNavBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OurStory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userType = queryParams.get("type"); // Retrieve the 'type' value
  const travelAgencyID = queryParams.get("id"); // Retrieve the travel agency ID
  const userId = queryParams.get("userId"); // Extract the userId from the URL (similar to your other component)
  
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch travel agency details from the API using axios
    const fetchTravelAgencyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/travel-agency/${travelAgencyID}`);
        const data = response.data;

        console.log(data);
        setDescription(data.description);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching travel agency data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (travelAgencyID) {
      fetchTravelAgencyDetails();
    }
  }, [travelAgencyID]);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const updatedData = { name, description };

      // Send the updated data to the API using axios
      await axios.put(`/api/travel-agency/${travelAgencyID}`, updatedData);

      console.log("Updated data:", updatedData);
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
      {/* Pass userId and userType to SidNavBar */}
      <SidNavBar type={userType} userId={userId}></SidNavBar>
      <div className="about-us">
        <h1 className="header-title">
          {isEditing && userType === "travel_agency" ? (
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
          {isEditing && userType === "travel_agency" ? (
            <textarea
              className="edit-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          ) : (
            description
          )}
        </div>
        {userType === "travel_agency" && (
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
