import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Login } from "./Login";
import "bootstrap/dist/css/bootstrap.css";
import { useIsAuthenticated } from "@azure/msal-react";
import { Link } from "react-router-dom";
import "../App.css";

const TopBar: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbarStyle">
      <Navbar.Brand className="brand" as={Link} to="/">
        Quantum
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isAuthenticated ? (
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Commpkg">
              Commpkg
            </Nav.Link>
            <Nav.Link as={Link} to="/System">
              Systems
            </Nav.Link>
            <Nav.Link as={Link} to="/Report">
              Report
            </Nav.Link>
          </Nav>
        ) : (
          <></>
        )}
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Login />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
