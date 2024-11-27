import React from "react";
import "./TicketSystem.css"; // Add your CSS file here for styling.
import html2canvas from "html2canvas";


const TicketSystem = () => {
    const handleDownload = async() => {
        const Ticket=document.querySelector(".receipt");
        if(!Ticket){
            return;
        }
        const canvas=await html2canvas(Ticket,{
            width:Ticket.offsetWidth,
            height:Ticket.offsetHeight,
            scale:2,
            useCORS:true,
        })
        //convert to image
        const image=canvas.toDataURL("image/png");
        //create a link
        const link=document.createElement("a");
        link.href=image;
        link.download="ticket.png";
        //click the link
        link.click();
        };
    
  return (
    <main className="ticket-system">
      <div className="receipts-wrapper">
        <div className="receipts">
          {/* Ticket Receipt */}

          <div className="receipt">
            <p className="Thanks">
                Thanks for booking❤️
            </p>
        
            <div className="route">
              <h2>NYC</h2>
              <svg
                className="plane-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 510 510"
              >
                <path
                  fill="#3f32e5"
                  d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z"
                />
              </svg>
              <h2>ATL</h2>
            </div>
            <div className="details">
              <div className="item">
                <span>Trip name</span>
                <h3>California</h3>
              </div>
              <div className="item">
                <span>Travel Agency name</span>
                <h3>Trivago</h3>
              </div>
              <div className="item">
                <span>Traveler Name</span>
                <h3>John Doe</h3>
              </div>
              <div className="item">
                <span>Date</span>
                <h3>08/26/2018</h3>
              </div>
              <div className="item">
                <span>Price</span>
                <h3>55$</h3>
              </div>
              <div className="item">
                <span>Number of seats</span>
                <h3>5</h3>
              </div>
            </div>
          </div>
          {/* QR Code Section */}
          <button className="download-btn" onClick={handleDownload}>
            Download Ticket
            </button>
        </div>
      </div>
    </main>
  );
};

export default TicketSystem;
