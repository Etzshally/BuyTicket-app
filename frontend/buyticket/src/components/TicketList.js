import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tickets', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <h3>{ticket.eventName}</h3>
            <p>Price: ${ticket.price}</p>
            <a href={`/tickets/${ticket._id}/payment`}>Buy Ticket</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
