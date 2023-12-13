import React,{useState} from 'react';
import '../../App.css';
import './style.css';
import AddUsers from '../../components/AddUsers';
import ListUsers from '../../components/ListUsers';
import AdminRooms from '../../components/AdminRooms';

const Users = () => {
  return (
    <div className='Main'>
      <UserMain />
      </div>
  );
};
const UserMain = () => {
  return (
    <UserHeader/>
  );
};



const UserHeader = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' par défaut

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };
return (
  <div id="container">
        
    <div className='head'>
    <h1>Users</h1>
    <div id="button-container" style={{display:'flex'}}>
      <button
        className={`button ${activeTab === 'list' ? 'active' : ''}`}
        onClick={() => handleButtonClick('list')}
      >
        List of Users
      </button>
      <button
        className={`button ${activeTab === 'add' ? 'active' : ''}`}
        onClick={() => handleButtonClick('add')}
      >
        Add New Users
      </button>
      <button
        className={`button ${activeTab === 'admin' ? 'active' : ''}`}
        onClick={() => handleButtonClick('admin')}
      >
        Rooms Admins
      </button>
    </div>
    </div>

    <div id="result-container" >
      {activeTab === 'list' && <ListUsers />}
      {activeTab === 'add' && <div><AddUsers /></div>}
      {activeTab === 'admin' && <div>< AdminRooms/></div>}
    </div>
  </div>
);
};

export default Users;