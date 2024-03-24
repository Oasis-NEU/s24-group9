/* eslint-disable react/prop-types */
import "./SearchResultsList.css"
import {SearchResults} from "./SearchResults"

const SearchResultsList = ({ searchResult }) => {
    return (
      <div className="results-list" /*style={{fontFamily:"serif", fontSize: "15"}}*/>
          {searchResult.map((location) => (
            <SearchResults result={location} key={location}/>
            //<div key={location}>{location} </div>s
          ))}
      </div>
    );
  };
  
  export default SearchResultsList;