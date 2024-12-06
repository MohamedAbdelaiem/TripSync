import "./QACards.css";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const QACards = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value

  const [qaData, setQaData] = useState([
    {
      QuestionID: 1,
      Question: "What are the services offered by the agency?",
      Answer: "We provide travel packages, hotel bookings, guided tours, and more.",
      Date: "2024-11-30",
      Time: "10:30 AM",
    },
    {
      QuestionID: 2,
      Question: "Do you offer discounts for group bookings?",
      Answer: "Yes, we offer special discounts for groups of 10 or more.",
      Date: "2024-11-30",
      Time: "11:00 AM",
    },
    // Add more Q&A data as needed
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({ ...qaData[index] });
  };

  const handleSave = (index) => {
    const updatedQaData = [...qaData];
    updatedQaData[index] = editedData;
    setQaData(updatedQaData);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flexx">
        <SideNavBar type={userType}></SideNavBar>
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
    </>
  );
};

export default QACards;
