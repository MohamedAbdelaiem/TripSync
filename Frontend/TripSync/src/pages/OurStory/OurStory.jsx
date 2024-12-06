import './OurStory.css';
import SidNavBar from '../../Components/SideNavBar/SideNavBar';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OurStory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchDescription = async () => {
      try {
        const response = await fetch('/OurStory.json');
        const data = await response.json();
        console.log(data);
        setDescription(data.description);
        setName(data.Name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setLoading(false);
      }
    };

    fetchDescription();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      // Simulate API call to save changes
      const updatedData = { Name: name, description };
      console.log("Saving updated data:", updatedData);

      // Add your API update logic here
      // Example:
      // await fetch('/updateOurStory', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData),
      // });

      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error saving updated About Us data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
console.log(userType);
console.log(isEditing);
  return (
    <>
      <div className="flex">
        <SidNavBar type={userType}></SidNavBar>
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
    </>
  );
};

export default OurStory;
