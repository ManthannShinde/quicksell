import React, { useState, useEffect } from 'react';
import Card from './Card'; 
import '../styles/PriorityData.css'; 

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

  // Group tickets by priority
  const groupedByPriority = sortedTickets.reduce((acc, ticket) => {
    (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
    return acc;
  }, {});

  const setPriorityName = (priority) => {
    switch (parseInt(priority, 10)) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Urgent';
      case 0:
        return 'No Priority';
    }
  }

  return (
    <div>
  <h2>Priority Data</h2>
  {error && <p className="error-message">Error: {error}</p>}
  <div className="priority-groups">
    {Object.keys(groupedByPriority).map((priority) => (
      <div key={priority} className="priority-group">
        <h3> {setPriorityName(priority)}</h3>
        <div className="cards-container">
          {groupedByPriority[priority].map((ticket) => (
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
    ))}
  </div>
</div>

  );
}

export default PriorityData;
