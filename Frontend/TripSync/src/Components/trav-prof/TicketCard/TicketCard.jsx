import React from "react";
import "./TicketCard.css";
import jsPDF from "jspdf";

const TicketCard = ({ ticket }) => {

  // const { image, tripName, bookingDate, startDate, status, seatsBooked, price } =
  //   ticket;
  const image = ticket.photos[0];
  const tripName = ticket.trip_name;
  const ticket_id = ticket.ticket_id;
  const bookingDate = ticket.date;
  const startDate = ticket.trip_startdate;
  // const status = ticket.hasStarted;
  const seatsBooked = ticket.numberofseats;
  const price = ticket.price;
  const traveller_name = ticket.traveller_name

  let current_date = new Date();
  let start_date = new Date(startDate);
  let booking_date = new Date(bookingDate);
  const status = start_date > current_date ? false : true;


  const handleDownloadPDF = () => {
    const doc = new jsPDF(); // Create a new PDF instance

    // Add Ticket Details to PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Ticket Details", 10, 10);

    doc.setFontSize(15);
    doc.text(`Traveller Name: ${traveller_name}`, 10, 30);
    doc.text(`Ticket ID: ${ticket_id}`, 10, 40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Trip Name: ${tripName}`, 10, 50);
    doc.text(`Booking Date: ${booking_date.toLocaleDateString()}`, 10, 60);
    doc.text(`Start Date: ${start_date.toLocaleDateString()}`, 10, 70);
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
            <strong>Booking Date:</strong> {booking_date.toLocaleDateString()}
          </p>
          <p>
            <strong>Start Date:</strong> {start_date.toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "} &nbsp;
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
