import React, { useState, useEffect } from 'react';
import Card from './Card';
function PriorityData({ orderprop }) {
  const [tickets, setTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data.tickets);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      let sorted = [...tickets];
      if (orderprop === 'Priority') {
        sorted.sort((a, b) => b.priority - a.priority); 
      } else if (orderprop === 'Title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title)); 
      }
      setSortedTickets(sorted);
    }
  }, [orderprop, tickets]);

  return (
    <div>
      <h2>Priority Data</h2>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="cards-container">
        {sortedTickets.map((ticket) => (
          <Card
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            tag={ticket.tag}
            status={ticket.status}
            priority={ticket.priority}
          />
        ))}
      </div>
    </div>
  );
}

export default PriorityData;
