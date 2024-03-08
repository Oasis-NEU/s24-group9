import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'

function App() {

  return (
    <div className = "App">
      <h1>Husky Laundry</h1>
      <div className = "search-bar-container">
        <SearchBar />
        <div>SearchResults</div>
      </div>
    </div>
  )
}

export default App
