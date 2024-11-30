
import "./QACards.css"; 
import AgencyNav from "../../Components/AgencyNav/AgencyNav";
const QACards = () => {
  const qaData = [
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
    {
        QuestionID: 3,
        Question: "Do you offer discounts for group bookings?",
        Answer: "Yes, we offer special discounts for groups of 10 or more.",
        Date: "2024-11-30",
        Time: "11:00 AM",
      },
      {
        QuestionID: 4,
        Question: "What are the services offered by the agency?",
        Answer: "We provide travel packages, hotel bookings, guided tours, and more.",
        Date: "2024-11-30",
        Time: "10:30 AM",
      },
    // Add more Q&A data as needed
  ];

  return (
    <>
    <div className="flex">
    <AgencyNav></AgencyNav>
    <div className="qa-cards-container">
      <h2 className="qa-cards-title">Questions & Answers</h2>
      <div className="qa-cards">
        {qaData.map((item) => (
          <div className="qa-card" key={item.QuestionID}>
            <div className="qa-card-header">
              <h3 className="qa-card-question">{item.Question}</h3>
            </div>
            <div className="qa-card-body">
              <p className="qa-card-answer">{item.Answer}</p>
            </div>
            <div className="qa-card-footer">
              <span>{item.Date}</span> | <span>{item.Time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default QACards;
