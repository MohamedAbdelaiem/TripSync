import React from "react";
import "./TicketCard.css";
import jsPDF from "jspdf";

const TicketCard = ({ ticket }) => {
  // const { image, tripName, bookingDate, startDate, status, seatsBooked, price } =
  //   ticket;
  const image = ticket.imageUrl;
  const tripName = ticket.tripName;
  const bookingDate = ticket.bookingDate;
  const startDate = ticket.startDate;
  const status = ticket.hasStarted;
  const seatsBooked = ticket.seatsBooked;
  const price = ticket.price;


  const handleDownloadPDF = () => {
    const doc = new jsPDF(); // Create a new PDF instance

    // Add Ticket Details to PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Ticket Details", 10, 10);

    doc.setFontSize(15);
    doc.text(`Traveller Name: ${ticket.travellerName}`, 10, 30);
    doc.text(`Ticket ID: ${ticket.id}`, 10, 40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Trip Name: ${tripName}`, 10, 50);
    doc.text(`Booking Date: ${bookingDate}`, 10, 60);
    doc.text(`Start Date: ${startDate}`, 10, 70);
    doc.text(`Status: ${status ? "Started" : "Not Started"}`, 10, 80);
    doc.text(`Seats Booked: ${seatsBooked}`, 10, 90);
    doc.text(`Price: $${price}`, 10, 100);

    doc.addImage(image, 10, 110, 190, 100);

    // Download the PDF
    doc.save(`${tripName.replace(/\s+/g, "_")}_ticket.pdf`);
  };




  return (
    <div className="ticket-card">
      <img src={image} alt={tripName} className="ticket-card-image" />
      <div className="ticket-card-content">
        <h3 className="ticket-card-title">{tripName}</h3>
        <div className="ticket-card-details">
          <p>
            <strong>Booking Date:</strong> {bookingDate}
          </p>
          <p>
            <strong>Start Date:</strong> {startDate}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`ticket-card-status ${
                status ? "started" : "not-started"
              }`}
            >
              {status ? "started" : "not-started"}
            </span>
          </p>
          <p>
            <strong>Seats Booked:</strong> {seatsBooked}
          </p>
          <p>
            <strong>Price:</strong> ${price}
          </p>
        </div>
        <button className="ticket-card-button" onClick={handleDownloadPDF}>
          Download
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
