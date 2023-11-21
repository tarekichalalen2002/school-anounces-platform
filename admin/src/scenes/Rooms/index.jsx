import '../../App.css';
import '../Users/style.css';
import React,{useState} from 'react';
import '../../App.css';
import '../Users/style.css';
import Existrooms from '../../components/ExistRooms';
import ReqRooms from '../../components/ReqRooms';


const Rooms = () => {
  return (
    <div className='Main'>
      <RoomsMain />
      </div>
  );
};
const RoomsMain = () => {
  return (
     <RoomsHeader/>
  );
};


const RoomsHeader = () => {
    const [activeTab, setActiveTab] = useState('exist'); // 'exist' par défaut
  
    const handleButtonClick = (tab) => {
      setActiveTab(tab);
    };
  return (
    <div id="container">
      <div className='head'>
      <h1>Rooms</h1>
      <div id="button-container">
        <button
          className={`button ${activeTab === 'exist' ? 'active' : ''}`}
          onClick={() => handleButtonClick('exist')}
        >
          Existing rooms
        </button>
        <button
          className={`button ${activeTab === 'req' ? 'active' : ''}`}
          onClick={() => handleButtonClick('req')}
        >
          Pending creation requests
        </button>
      </div>
      </div>
  
      <div id="result-container">
        {activeTab === 'exist' && <Existrooms />}
        {activeTab === 'req' && <div><ReqRooms /></div>}
      </div>
    </div>
  );
  };

export default Rooms;
