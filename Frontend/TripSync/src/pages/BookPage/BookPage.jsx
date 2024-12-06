import React from "react";
import { useLocation } from "react-router-dom";
import Book from "../Book/Book"

const BookPage = () => {
  const location = useLocation();
  const tour = location.state?.tour; // Retrieve the tour from the state

  if (!tour) {
    return <div>No tour selected. Please go back and select a tour.</div>;
  }

  return <Book tour={tour} />;
};

export default BookPage;
