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
