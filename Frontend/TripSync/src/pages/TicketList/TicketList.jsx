import Ticket from "../../Components/trav-prof/Ticket/Ticket";
import { all_tickets } from "../../Components/trav-prof/Ticket/tickets";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const TicketsList = (props) => {
  // tickets = all_tickets.filter((ticket) => ticket.id == )
  const [userID, setUserID] = useState(null);

  let { id } = useParams();
  useEffect(() => {
    setUserID(id);
  }, [id]);
  
  const tickets = all_tickets.filter((ticket) => ticket.travellerId == userID);

  if (tickets.length === 0) {
    return (
      <>
        <div className="empty-tickets">There is no tickets</div>
      </>
    );
    
  }

  return (
    <div className="tickets-list">
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticketId={ticket.id}
          imageUrl={ticket.imageUrl}
          tripName={ticket.tripName}
          bookingDate={ticket.bookingDate}
          startDate={ticket.startDate}
          hasStarted={ticket.hasStarted}
          seatsBooked={ticket.seatsBooked}
          price={ticket.price}
          travellerId={ticket.travellerId}
          tripId={ticket.tripId}
          travellerName={ticket.travellerName}
        />
      ))}
    </div>
  );
};

export default TicketsList;
