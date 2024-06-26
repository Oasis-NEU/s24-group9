import React from "react";
import "./SearchResults.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const SearchResults = ({result}) => {
  const navigateToRoom = useNavigate();
    const handleClick = () => {
        axios.get("https://husky-laundry.onrender.com/location/id/" + result).then((response) => {
          navigateToRoom('/rooms', {state: {id:response.data, name:result}});
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

