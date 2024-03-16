/* eslint-disable react/prop-types */
const SearchResultsList = ({ searchResult }) => {
    return (
      <div>
          {searchResult.map((location) => (
            <div key={location}>{location}</div>
          ))}
      </div>
    );
  };
  
  export default SearchResultsList;