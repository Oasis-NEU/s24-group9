import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

function NavBar() {
  return (
    <div>
      <Navbar bg="transparent" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <img src = '/src/images/logo.png' alt = 'Husky Laundry' className="navLogo"/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Problems">Problems</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;