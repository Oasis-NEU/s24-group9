import React, {useState, useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'

export const SearchBar = () => {
    const [input, setInput] = useState();
    /*represents the id of the machine entered*/ 
    const [id, setId] = useState();

    useEffect(() => {
        /*fetch the location id, then put the response to json, set input to whatever is in the json*/
        fetch("/location/id/stetson%20west%20back")
        .then(res => res.json())
        .then(id => {
            setId(id)
            console.log(id)
        })
    }, )

    const fetchData = (value) => {
        
    }

    return (
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder='Type to Search' 
        /*Stores the input in the value*/
        value={input} 
        /*Whenever the user changes the value inside: take the event and set input as target value*/
        onChange={(e) => setInput(e.target.value)}
        />
    </div>
    );
};