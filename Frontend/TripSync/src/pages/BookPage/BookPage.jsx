import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Book from "../Book/Book";
import Toast from "../Toast/Toast";

const BookPage = () => {
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [ticketCreated, setTicketCreated] = useState(false);
  
  const handleBooking = () => {
    setTicketCreated(true); // Simulate ticket creation
    setShowToast(true); // Show the toast notification
    // if(showToast)
    console.log("Toast should be shown now");
  };
  
  const location = useLocation();
  const tour = location.state?.tour; // Retrieve the tour from the state
  
  if (!tour) {
    return <div>No tour selected. Please go back and select a tour.</div>;
  }
  console.log({showToast})
  return (
    <div>
      <Book tour={tour} onEnsureBooking={handleBooking} />
      
      {showToast && (
        <div className="toast-container">
          <Toast
            message="Your ticket has been created successfully!"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
   
  );

};

export default BookPage;
