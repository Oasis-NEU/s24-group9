<<<<<<< HEAD
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
=======
import { useState} from 'react'
/* useState: state variable containing data retrieved from the backend
  useEffect: fetch the backend on the first render */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './MainPage'

function App() {
  const [searchResult, setSearchResult] = useState([])

  return (
    <Router>
    <Routes>
      <Route path="/" element= {<MainPage/>} />
    </Routes>
  </Router>
  )
}

export default App
>>>>>>> main
