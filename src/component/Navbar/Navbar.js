import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CarWidget/CarWidget';
import LogoPage from '../LogoPage/LogoPage';
import {useNavigate} from "react-router-dom"
import * as React from 'react';


function CollapsibleNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand > <LogoPage/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/About")}>About</Nav.Link>
            <NavDropdown title="Products" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=>navigate("/")}> All products </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>navigate("/category/celular")}>Cellphones</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/category/tablet")}>Tablets</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/category/notebook")}>Notebook</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/category/speaker")}>Speakers</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate("/category/headphone")}>Headphones</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={()=>navigate("/Cart")}> <CartWidget/> </Nav.Link>
            <Nav.Link eventKey={3} onClick={()=>navigate("/Login")}> 
            <div style={{display: 'flex',  justifyContent:'center', height: '3vh'}}>login</div>
            
             </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleNavbar;