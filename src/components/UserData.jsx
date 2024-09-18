import React, { useState, useEffect } from 'react';
import Card from './Card'; 
import '../styles/UserData.css';

function UserData({ orderprop }) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedByUser, setGroupedByUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {

    Promise.all([
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then((response) => response.json())
        .then((data) => data.tickets),
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then((response) => response.json())
        .then((data) => data.users)
    ])
    .then(([ticketsData, usersData]) => {
      setTickets(ticketsData);
      setUsers(usersData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setError(error.message);
    });
  }, []);

  useEffect(() => {
    if (tickets.length > 0 && users.length > 0) {
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      const ticketsWithUserNames = tickets.map(ticket => ({
        ...ticket,
        userName: userMap[ticket.userId]
      }));

      let sorted = [...ticketsWithUserNames];
      if (orderprop === 'Title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (orderprop === 'Priority') {
        sorted.sort((a, b) => b.priority - a.priority); 
      }

      const grouped = sorted.reduce((acc, ticket) => {
        (acc[ticket.userName] = acc[ticket.userName] || []).push(ticket);
        return acc;
      }, {});

      const sortedGroupedByUser = Object.keys(grouped)
        .sort()
        .reduce((acc, userName) => {
          acc[userName] = grouped[userName];
          return acc;
        }, {});

      setGroupedByUser(sortedGroupedByUser);
    }
  }, [orderprop, tickets, users]);

  return (
    <div>
      {/* <h2>User Data</h2> */}
      {error && <p className="error-message">Error: {error}</p>}
      <div className="user-groups">
        {Object.keys(groupedByUser).map((userName) => (
          <div key={userName} className="user-group">
            <h3>{userName}</h3>
            <div className="cards-container">
              {groupedByUser[userName].map((ticket) => (
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

export default UserData;
