import React, { useEffect, useState } from 'react';

function Display() {
  const [tickets, setTickets] = useState([]);  
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);  
        setLoading(false);
      })  
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Title:</strong> {ticket.title}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Tags:</strong> {ticket.tag.join(', ')}</p>
            <p><strong>User ID:</strong> {ticket.userId}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Display;
