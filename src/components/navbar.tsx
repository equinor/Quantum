import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import "bootstrap/dist/css/bootstrap.css";

const NavbarComponent: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbarStyle">
      <Navbar.Brand href="#home">GraphQL test</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="commpkg">Commpkg</Nav.Link>
        </Nav>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
