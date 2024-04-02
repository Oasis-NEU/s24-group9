import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './MainPageNavBar.css';

const MainPageNavBar = () => {
  return (
    <div>
     <Navbar sticky='bottom' expand = 'lg' bg= "light" data-bs-theme="light">
        <Container>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'></Nav>
            <Nav className='me-auto'>
                <Nav.Item as={'div'} className='navLinksMain'>
                    <Nav.Link href="/problems" as={'a'} className='linksMain'>Report Problems</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    </Navbar>
    </div>
  );
}

export default MainPageNavBar;