import "./QACards.css";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import { UserContext } from "../../assets/userContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const QACards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { user } = useContext(UserContext);
  const { user_id } = useParams();

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
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/myProfile/QA/updateQA/${qaData[index].question_id}`,
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
      <SideNavBar type={user.role} userId={user_id}></SideNavBar>

      <div className="qa-cards-container">
        <h2 className="qa-cards-title">Questions & Answers</h2>
        <div className="qa-cards">
          {qaData.map((item, index) => (
            <div className="qa-card" key={item.question_id}>
              {editIndex === index && user.role === "travel_agency" &&user_id===user.user_id? (
                <>
                  <div className="qa-card-header">
                    <textarea
                      className="edit-textarea"
                      name="Question"
                      value={editedData.question}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="qa-card-body">
                    <textarea
                      className="edit-textarea"
                      name="Answer"
                      value={editedData.answer}
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
                    <h3 className="qa-card-question">{item.question}</h3>
                  </div>
                  <div className="qa-card-body">
                    <p className="qa-card-answer">{item.answer}</p>
                  </div>
                  <div className="qa-card-footer">
                    <span>{item.Date}</span> | <span>{item.time}</span>
                  </div>
                  {user.role === "travel_agency" && (
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
