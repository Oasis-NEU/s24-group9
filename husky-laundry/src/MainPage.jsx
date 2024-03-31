import SearchResultsList from "./components/SearchResultsList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import './MainPage.css';

const MainPage = () => {
  const [searchResult, setSearchResult] = useState([])

    return (
      <>
        <div className = "App">
          <h1 style={{ fontSize: 40, paddingTop: 50}}>
            <img src = '/src/images/blackLogo.png' alt = "logo" className="logo"/>
          </h1>
          <div className = "search-bar-container">
            <SearchBar setSearchResult = {setSearchResult}/>
            <SearchResultsList searchResult = {searchResult}/>
          </div>
        </div>
      </>
    )
}

export default MainPage;