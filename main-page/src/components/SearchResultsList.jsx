/* eslint-disable react/prop-types */
import axios from 'axios'
const SearchResultsList = ({ searchResult }) => {

  const onclick = (name) => {
    axios.get("http://localhost:5050/location/id/" + name).then((response) => {
      
    })
    console.log()
  }

    return (
      <div>
          {searchResult.map((location) => (
            <div key={location}>{location} </div>
          ))}
      </div>
    );
  };
  
  export default SearchResultsList;