import React, {useState, useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import axios from 'axios';

export const SearchBar = ({setSearchResult}) => {
    const [input, setInput] = useState("");
    const[data, setData] = useState([{}])
    const[keys, setKeys] = useState([])

    // const fetchRoom = (value) => {
    //     axios.get('/rooms/names').then((response) => {
    //         setData(response.data);
    //         setKeys(Object.keys(data));
    //     }).then(() => {
    //         const results = keys.filter(() => {
    //             return (
    //                 keys.toLowerCase.includes(value)
    //             );
    //         });
    //         setSearchResult(results);
    //     });
    // };

    const fetchRoom = () => {
		axios
			.get('/rooms/names')
			.then((response) => {
				setData(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const setCurrentList = (userInput) => {
		const res = Object.keys(data).filter((location) => {
			return location.toLowerCase().includes(userInput.toLowerCase())
		})
		{setSearchResult}(res)
	}

    useEffect(() => {
        fetchRoom();
    }, []);

    const handleChange = (value) => {
        setCurrentList(value);
        console.log(Object.keys(data));
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
        { result.map((location) => {
	<div>{location}</div>
})} 
    </div>
    );
};