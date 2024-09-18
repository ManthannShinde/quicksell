import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PriorityData from './components/PriorityData';
import UserData from './components/UserData';
import StatusData from './components/StatusData';

function App() {

  const [filterprop, setFilterprop] = useState('');
  const filterFunction = (filter) => {
    setFilterprop(filter);
  }

  return (
    <div className="App"> 
      <Navbar filterFunction={filterFunction} />
     
      {filterprop === 'Priority' && <PriorityData/>}
      {filterprop === 'User' && <UserData/>}
      {filterprop === 'Status' && <StatusData/>}
    </div>
  );
}

export default App;
 