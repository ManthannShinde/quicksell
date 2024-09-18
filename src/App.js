import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PriorityData from './components/PriorityData';
import UserData from './components/UserData';
import StatusData from './components/StatusData';

function App() {

  const [filterprop, setFilterprop] = useState('');
  const [orderprop, setOrderprop] = useState('');

  const filterFunction = (filter) => {
    setFilterprop(filter);
  }
  const orderFunction = (order) => {
    setOrderprop(order);
  }

  return (
    <div className="App"> 
      <Navbar filterFunction={filterFunction} orderFunction = {orderFunction}/>
     
      {filterprop === 'Priority' && <PriorityData orderprop={orderprop} />}
      {filterprop === 'User' && <UserData orderprop={orderprop} />}
      {filterprop === 'Status' && <StatusData orderprop={orderprop} />}

    </div>
  );
}

export default App;
 