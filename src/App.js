import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PriorityData from './components/PriorityData';
import UserData from './components/UserData';
import StatusData from './components/StatusData';

function App() {
  const getInitialFilter = () => localStorage.getItem('filterprop') || 'Status';
  const getInitialOrder = () => localStorage.getItem('orderprop') || 'Priority';

  const [filterprop, setFilterprop] = useState(getInitialFilter);
  const [orderprop, setOrderprop] = useState(getInitialOrder);

  useEffect(() => {
    localStorage.setItem('filterprop', filterprop);
  }, [filterprop]);

  useEffect(() => {
    localStorage.setItem('orderprop', orderprop);
  }, [orderprop]);

  const filterFunction = (filter) => {
    setFilterprop(filter);
  };

  const orderFunction = (order) => {
    setOrderprop(order);
  };

  return (
    <div className="App">
      <Navbar filterFunction={filterFunction} orderFunction={orderFunction} />
      
      {filterprop === 'Priority' && <PriorityData orderprop={orderprop} />}
      {filterprop === 'User' && <UserData orderprop={orderprop} />}
      {filterprop === 'Status' && <StatusData orderprop={orderprop} />}
    </div>
  );
}

export default App;
