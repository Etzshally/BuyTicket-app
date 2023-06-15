import React, { useState } from 'react';
import axios from 'axios';

const TicketCreate = () => {
  const [eventName, setEventName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/tickets',
        { eventName, price },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      window.location.href = '/tickets';
    } catch (error) {
      setError('Error creating ticket');
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketCreate;
