import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './scenes/global/Sidebar';
import Rooms from './scenes/Rooms';
import Users from './scenes/Users';
import Assistance from './scenes/Assistance';
import Reports from './scenes/Reports';
import LoginPage from './scenes/LoginPage';
import ExistingRooms from './components/ExistRooms';
import RoomDetails from './components/RoomDetail';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogin = (status) => {
    setIsAdmin(status);
  };
  if (!isAdmin) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Assistance" element={<Assistance />} />
          <Route path="/Rooms" element={<ExistingRooms />} />
          <Route path="/Rooms/RoomDetails/:roomName" element={<RoomDetails />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
