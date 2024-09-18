import React, { useState, useEffect } from 'react';
import Card from './Card'; 
import '../styles/StatusData.css';

function StatusData({ orderprop }) {
  const [tickets, setTickets] = useState([]);
  const [groupedByStatus, setGroupedByStatus] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTickets(data.tickets))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      let sorted = [...tickets];

      if (orderprop === 'Status') {
        sorted.sort((a, b) => a.status.localeCompare(b.status));
      } else if (orderprop === 'Title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (orderprop === 'Priority') {
        sorted.sort((a, b) => b.priority - a.priority);
      }

      const grouped = sorted.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});

      const sortedGroupedByStatus = Object.keys(grouped)
        .sort()
        .reduce((acc, status) => {
          acc[status] = grouped[status];
          return acc;
        }, {});

      if (orderprop === 'Priority') {
        Object.keys(sortedGroupedByStatus).forEach((status) => {
          sortedGroupedByStatus[status] = sortedGroupedByStatus[status].sort((a, b) => b.priority - a.priority);
        });
      }

      setGroupedByStatus(sortedGroupedByStatus);
    }
  }, [orderprop, tickets]);

  return (
    <div>
      {/* <h2>Status Data</h2> */}
      {error && <p className="error-message">Error: {error}</p>}
      <div className="status-groups">
        {Object.keys(groupedByStatus).map((status) => (
          <div key={status} className="status-group">
            <h3>{status}</h3>
            <div className="cards-container">
              {groupedByStatus[status].map((ticket) => (
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

export default StatusData;
