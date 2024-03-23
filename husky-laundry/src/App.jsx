
import { useState} from 'react'
import React from 'react';
import './App.css'; // Add any necessary styles
import LaundryRoom from './LaundryRoom';
import Problems from './Problems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchResult, setSearchResult] = useState([])

  return (
    <Router>
    <Routes>
      <Route path="/" element= {<MainPage/>} />
      <Route path="/rooms" element= {<LaundryRoom id = {1343672}/>} />
          <Route path="/problems" element={<Problems/>} />  
    </Routes>
  </Router>
  )
}

export default App