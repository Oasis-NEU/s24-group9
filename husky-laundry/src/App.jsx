// src/App.js
import React from 'react';
import './App.css'; // Add any necessary styles
import LaundryRoom from './LaundryRoom';
import Problems from './Problems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/rooms" element= {<LaundryRoom id = {1343672}/>} />
          <Route path="/problems" element={<Problems/>} />  
        </Routes>
      </Router>
     // {LaundryRoom(1343672)}
  );
}

export default App;
