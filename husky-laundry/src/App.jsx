
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add any necessary styles
import MainPage from './MainPage';
import ProblemPage from './ProblemPage';
import LaundryRoom from './LaundryRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element= {<MainPage/>} />
      <Route path="/rooms" element= {<LaundryRoom/>} />
      <Route path="/problems" element={<ProblemPage/>} />  
    </Routes>
  </Router>
  )
}

export default App