
import SearchResultsList from "./components/SearchResultsList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

const MainPage = () => {
  const [searchResult, setSearchResult] = useState([])

    return (
        <div className = "App">
          <div id="problem">
          <a href="/problems">Report a Problem</a>
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