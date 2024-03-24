import React from "react";
import "./SearchResults.css"
import axios from 'axios'

export const SearchResults = ({result}) => {
    const handleClick = () => {
        axios.get("http://localhost:5050/location/id/" + result).then((response) => {
          alert(response.data)
        })
    };

    return (
        <div 
            className="result" 
            style={{ textAlign: 'left' }}
            onClick={handleClick}>
          {result}
        </div>
      );
};

