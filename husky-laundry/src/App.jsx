
import { useState} from 'react'
import React from 'react';
import './App.css'; // Add any necessary styles
import MainPage from './MainPage';
import ProblemPage from './ProblemPage';
import LaundryRoom from './LaundryRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchResult, setSearchResult] = useState([])

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