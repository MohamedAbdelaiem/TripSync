import "./QACards.css";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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

  const [newQuestion, setNewQuestion] = useState("");  // New question input state
  const [newAnswer, setNewAnswer] = useState("");      // New answer input state

  useEffect(() => {
    const fetchQAData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/myProfile/QA/getAllQAOfAgency/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
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
console.log(qaData)
  const handleDelete = async (questionId) => {
    try {
      setLoading(true);
      // Send DELETE request to the API
      await axios.delete(
        `http://localhost:3000/api/v1/users/myProfile/QA/deleteQA/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Optimistic UI update: Remove the deleted QA from the state immediately
      setQaData(qaData.filter((item) => item.question_id !== questionId));
  
    } catch (error) {
      console.error("Error deleting QA data:", error);
      setError("Failed to delete QA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({ question: qaData[index].question, answer: qaData[index].answer });
  };

  const handleSave = async (index) => {
    try {
      setLoading(true);
  
      // Check if the index exists in qaData
      if (!qaData[index]) {
        throw new Error("Invalid index");
      }
  
      // Send PATCH request to update the QA data
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/myProfile/QA/updateQA/${qaData[index].question_id}`,
        editedData, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log(response); // Log the response to check the data
  
      // Check if response contains valid data
      if (!response.data) {
        throw new Error("Failed to save, invalid response data");
      }
  
      // Fetch the updated QA data after save
      const fetchQAData = async () => {
        try {
          const fetchResponse = await axios.get(
            "http://localhost:3000/api/v1/users/myProfile/QA/getAllQA",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setQaData(fetchResponse.data); // Update the state with the new data
        } catch (error) {
          console.error("Error fetching QA data:", error);
          setError("Failed to load data. Please try again later.");
        }
      };
  
      fetchQAData(); // Fetch the latest data from the server after saving
  
      // Reset edit state
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving QA data:", error);
      setError(error.message || "Failed to save changes. Please try again.");
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

  const handleAddQA = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/myProfile/QA/addQA",
        { question: newQuestion, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // After adding a new QA, fetch the updated QA data
      const fetchQAData = async () => {
        try {
          const fetchResponse = await axios.get(
            "http://localhost:3000/api/v1/users/myProfile/QA/getAllQA",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setQaData(fetchResponse.data);  // Update the state with the newly fetched data
        } catch (error) {
          console.error("Error fetching QA data:", error);
          setError("Failed to load data. Please try again later.");
        }
      };
      fetchQAData(); // Fetch the latest data from the server
      
      // Clear inputs
      setNewQuestion(""); 
      setNewAnswer(""); 
    } catch (error) {
      console.error("Error adding new QA:", error);
      setError("Failed to add new QA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="flexx">
      <SideNavBar type={user.role} userId={user_id}></SideNavBar>

      <div className="qa-cards-container">
        <h2 className="qa-cards-title">Questions & Answers</h2>

        {/* Show add QA form for travel agencies */}
        {user.role === "travel_agency" && Number(user_id) === user.user_id && (
          <div className="add-qa-form">
            <h3>Add a New Question & Answer</h3>
            <textarea
              className="edit-textarea"
              placeholder="Enter your question here"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <textarea
              className="edit-textarea"
              placeholder="Enter the answer here"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button className="btn save-btn" onClick={handleAddQA}>
              Add QA
            </button>
          </div>
        )}

        <div className="qa-cards">
          {qaData.map((item, index) => (
            <div className="qa-card" key={item.question_id}>
              {editIndex === index && user.role === "travel_agency" && Number(user_id) === user.user_id ? (
                <>
                  <div className="qa-card-header">
                    <textarea
                      className="edit-textarea"
                      name="question"
                      value={editedData.question}  // binding to editedData
                      onChange={handleChange}
                    />
                  </div>
                  <div className="qa-card-body">
                    <textarea
                      className="edit-textarea"
                      name="answer"
                      value={editedData.answer}  // binding to editedData
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
            {user.role === "travel_agency" && Number(user_id) === user.user_id && (
        <button 
          className="delete-btn"
         onClick={() => handleDelete(item.question_id)}
         >
        X
       </button>
       )}
        </div>

                  <div className="qa-card-body">
                    <p className="qa-card-answer">{item.answer}</p>
                  </div>
                  <div className="qa-card-footer">
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(item.date))}{" "}
                        |{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(item.date))}
                      </span>
                      {user.role === "travel_agency" && Number(user_id) === user.user_id && (
                        <button
                          className="btn edit-btn"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                      )}
                    </div>

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
