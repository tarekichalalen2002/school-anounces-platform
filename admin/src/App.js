import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './scenes/global/Sidebar.jsx';
import Rooms from "./scenes/Rooms";
import Users from "./scenes/Users";
import Assistance from "./scenes/Assistance";
import Reports from "./scenes/Reports";

function App() {
  
  return (
    <Router>
    <div className="App">
      <Sidebar />
          
            <Routes>
              <Route path="/Rooms" element={<Rooms />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Assistance" element={<Assistance />} />              
            </Routes>
          
    </div>
    </Router>
  );
}
export default App;
