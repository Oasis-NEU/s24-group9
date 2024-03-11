import { useState, useEffect} from 'react'
/* useState: state variable containing data retrieved from the backend
  useEffect: fetch the backend on the first render */
import './App.css'
import { SearchBar } from './components/SearchBar'

function App() {

  return (
    <div className = "App">
      <h1 style={{ fontSize: 40, paddingTop: 120}}>
        Husky Laundry
      </h1>
      <div className = "search-bar-container">
        <SearchBar />
        <div>SearchResults</div>
      </div>
    </div>
  )
}

export default App
