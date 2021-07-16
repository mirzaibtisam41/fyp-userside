import React, { useContext } from 'react';
import "./Header.css";
import { GlobalContext } from "./HeaderContext";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
    const { categoryList } = useContext(GlobalContext);
    const history = useHistory();
    return <>
        <Navbar bg="white" expand="lg" className="header-div" style={{ marginTop: "3.6rem", height: "3.5rem" }}>
            <Container>
                <Navbar.Brand href="#home" className="text-primary">Categories</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ zIndex: "1" }}>
                    <Nav className="mr-auto bg-white px-2" style={{ marginLeft: "1rem" }}>
                        {
                            categoryList && categoryList.map((item, index) => {
                                return <NavDropdown key={index} title={item.name} id="basic-nav-dropdown">
                                    {
                                        item.children.map((item, index) => <NavDropdown.Item key={index} onClick={(e) => history.push(`/category?slug=${e.target.innerText}`)} >{item.name}</NavDropdown.Item>)
                                    }
                                </NavDropdown>
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default Header;
