import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({filterFunction, orderFunction}) {
  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState('');
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    filterFunction(filter);
    // console.log(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    orderFunction(order);
    // console.log(e.target.value);
  };

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
