import React, {useState, useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import axios from 'axios';

export const SearchBar = () => {
    const [input, setInput] = useState("");
    //represents the id of the machine entered
    //const [id, setId] = useState();
    const[data, setData] = useState([{}])

    /*
    useEffect((value) => {
        //fetch the location id, then put the response to json, set input to whatever is in the json
        fetch("/rooms/names")
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
        })
    }, [])
    */
    ///*
    // const fetchData = (value) => {
    //     fetch("/rooms/names")
    //     .then(res => res.json())
    //     .then(data => {
    //         setData(data);
    //         console.log(data)}
    //     );
    // };

    const fetchRoom = () => {
        axios.get('http://127.0.0.1:3001/rooms/names').then((response) => {
            setData(response.data);
        })
    }

    useEffect(() => {
        fetchRoom();
        console.log(data);
    }, []);

    const handleChange = (value) => {
        setInput(value);
        fetchRoom();
        console.log(data);
    };
    
    return (
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder='Type to Search...' 
        //Stores the input in the value
        value={input} 
        //Whenever the user changes the value inside: take the event and set input as target value
        onChange={(e) => handleChange(e.target.value)}
        />
    </div>
    );
};