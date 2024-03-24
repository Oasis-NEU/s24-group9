import React from "react";
import "./SearchResults.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const SearchResults = ({result}) => {
  const navigateToRoom = useNavigate();
    const handleClick = () => {
        axios.get("http://localhost:5050/location/id/" + result).then((response) => {
          navigateToRoom('/rooms', {state: response.data})
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

