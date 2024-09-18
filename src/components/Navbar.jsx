import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

function Navbar({ filterFunction, orderFunction }) {
  const getInitialFilter = () => localStorage.getItem('filterprop') || 'Status';
  const getInitialOrder = () => localStorage.getItem('orderprop') || 'Priority';

  const [filter, setFilter] = useState(getInitialFilter);
  const [order, setOrder] = useState(getInitialOrder);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    filterFunction(newFilter);
    localStorage.setItem('filterprop', newFilter); 
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    orderFunction(newOrder);
    localStorage.setItem('orderprop', newOrder); 
  };

  useEffect(() => {
    setFilter(getInitialFilter);
    setOrder(getInitialOrder);
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <button className="dropbtn">Display ▾</button>
          <div className="dropdown-content">
            <div className="nested-dropdown">
              <span>Grouping</span>
              <select onChange={handleFilterChange} value={filter}>
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="nested-dropdown">
              <span>Ordering</span>
              <select onChange={handleOrderChange} value={order}>
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
