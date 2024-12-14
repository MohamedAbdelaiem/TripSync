import "./QACards.css";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const QACards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userType = queryParams.get("type");
  const userId = queryParams.get("userId");  // Extract the userId from URL query parameters

  const [qaData, setQaData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQAData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/myProfile/QA/getAllQA",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQaData(response.data);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching QA data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQAData();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({ ...qaData[index] });
  };

  const handleSave = async (index) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/v1/users/myProfile/QA/${qaData[index].QuestionID}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedQaData = [...qaData];
      updatedQaData[index] = response.data;
      setQaData(updatedQaData);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving QA data:", error);
      setError("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="flexx">
      {/* Pass userId to SideNavBar as a prop */}
      <SideNavBar type={userType} userId={userId}></SideNavBar>

      <div className="qa-cards-container">
        <h2 className="qa-cards-title">Questions & Answers</h2>
        <div className="qa-cards">
          {qaData.map((item, index) => (
            <div className="qa-card" key={item.QuestionID}>
              {editIndex === index && userType === "travel_agency" ? (
                <>
                  <div className="qa-card-header">
                    <textarea
                      className="edit-textarea"
                      name="Question"
                      value={editedData.Question}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="qa-card-body">
                    <textarea
                      className="edit-textarea"
                      name="Answer"
                      value={editedData.Answer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="qa-card-footer">
                    <button
                      className="btn save-btn"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                    <button className="btn cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="qa-card-header">
                    <h3 className="qa-card-question">{item.Question}</h3>
                  </div>
                  <div className="qa-card-body">
                    <p className="qa-card-answer">{item.Answer}</p>
                  </div>
                  <div className="qa-card-footer">
                    <span>{item.Date}</span> | <span>{item.Time}</span>
                  </div>
                  {userType === "travel_agency" && (
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QACards;
