import {useState, useEffect} from 'react'
import {FaSearch} from "react-icons/fa"
import './SearchBar.css'
import axios from 'axios';

const SearchBar = ({setSearchResult}) => {
    const [input, setInput] = useState("");
    const[data, setData] = useState([{}]);

    const fetchRoom = () => {
		axios
			.get('http://localhost:5050/rooms/names')
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const setCurrentList = (userInput) => {
		const res = Object.keys(data).filter((location) => {
			return location.toLowerCase().includes(userInput.toLowerCase())
		})
        setSearchResult(res);
        if (userInput === '') {
            setSearchResult([]);
        }
	}

    useEffect(() => {
        fetchRoom();
    }, []);

    const handleChange = (value) => {
        setInput(value);
        setCurrentList(value);
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

export default SearchBar;