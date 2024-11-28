import React from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import "../../../pages/TicketList/TicketList.css"; // رابط ملف CSS


const Ticket = ({
  ticketId,
  imageUrl,
  tripName,
  bookingDate,
  startDate,
  hasStarted,
  seatsBooked,
  price,
  travellerId,
  tripId,
  travellerName,
}) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF(); // Create a new PDF instance

    // Add Ticket Details to PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Ticket Details", 10, 10);

    doc.setFontSize(15);
    doc.text(`Traveller Name: ${travellerName}`, 10, 30);
    doc.text(`Ticket ID: ${ticketId}`, 10, 40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Trip Name: ${tripName}`, 10, 50);
    doc.text(`Booking Date: ${bookingDate}`, 10, 60);
    doc.text(`Start Date: ${startDate}`, 10, 70);
    doc.text(`Status: ${hasStarted ? "Started" : "Not Started"}`, 10, 80);
    doc.text(`Seats Booked: ${seatsBooked}`, 10, 90);
    doc.text(`Price: $${price}`, 10, 100);

    doc.addImage(imageUrl, 10, 110, 190, 100);

    // Download the PDF
    doc.save(`${tripName.replace(/\s+/g, "_")}_ticket.pdf`);
  };

  return (
    <div className="ticket">
      {/* صورة الرحلة */}
      <img src={imageUrl} alt={`${tripName} thumbnail`} />

      {/* محتوى التذكرة */}
      <div className="ticket-content">
        <h2>{tripName}</h2>
        <p>
          <strong>Booking Date:</strong> {bookingDate}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="highlight">
            {hasStarted ? "Started" : "Not Started"}
          </span>
        </p>
        <p>
          <strong>Seats Booked:</strong> {seatsBooked}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>

        {/* زر التنزيل */}
        <button className="download-button" onClick={handleDownloadPDF}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
