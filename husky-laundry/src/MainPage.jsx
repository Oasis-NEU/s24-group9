
import SearchResultsList from "./components/SearchResultsList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

const MainPage = () => {
  const [searchResult, setSearchResult] = useState([]);

    return (
        <div className = "App">
          <div className="problem" style={{fontSize: 20, position: "absolute", top: 30, right: 50}}>
          <a href="/problems" className="problemWord" >Report Problems</a>
          </div>
          <h1 style={{ fontSize: 40, paddingTop: 120}}>
            Husky Laundry
          </h1>
          <div className = "search-bar-container">
            <SearchBar setSearchResult = {setSearchResult}/>
            <SearchResultsList searchResult = {searchResult}/>
          </div>
        </div>
      )
}

export default MainPage;