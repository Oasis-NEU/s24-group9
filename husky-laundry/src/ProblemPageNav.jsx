import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './NavBar.css';
import { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProblemPageNav = () => {
    const[data, setData] = useState({});
    const[roomDict, setDict] = useState({});
    const[rooms, setRooms] = useState([]);
    const navigateToRoom = useNavigate();
    const location = useLocation();

    const fetchRoom = () => {
		axios
			.get('http://localhost:5050/rooms/names')
			.then((response) => {
				setData(response.data);
                setDict(response.data);
			})
			.catch((error) => {
				console.log(error)
			})
    }

    const setRoomsList = () => {
        const res = Object.keys(data);
        setRooms(res);
    }

    useEffect(() => {
        fetchRoom(); 
    }, []);

    useEffect(() => {
        setRoomsList();
    }, [data]);

    const handleRoomClick = (room) => {
        navigateToRoom(location.pathname, { replace: true });
        navigateToRoom('/rooms', { state: { id: roomDict[room], name: room } });
    };

  return (
    <div>
     <Navbar sticky='bottom' expand = 'lg' bg= "dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">
                <img src='/src/images/logo.png' alt='Husky Laundry' className="navLogo" />
            </Navbar.Brand>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav>
                <DropdownButton
                    key={'down-centered'}
                    id={`dropdown-button-drop-down-centered`}
                    align={{ lg: 'end' }}
                    drop={'down-centered'}
                    variant="secondary"
                    title={`Rooms`}>
                    {rooms.map((name, index) => (
                        <Dropdown.Item key={index}  onClick={() => handleRoomClick(name)}>
                            {name}
                        </Dropdown.Item>
                        )
                    )}
                </DropdownButton>
            </Nav>
        </Container>
    </Navbar>
    </div>
  );
}

export default ProblemPageNav;