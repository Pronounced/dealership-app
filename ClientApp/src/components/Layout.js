import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export default class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        { this.props.isLoggedIn && <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/Inventory">Car Dealership</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Inventory">See Inventory</Nav.Link>
            {!this.props.isAdmin && <Nav.Link as={Link} to="/UserInventory">See My Cars</Nav.Link>}
            {!this.props.isAdmin && <Nav.Link as={Link} to="/ContactUs">Contact Us</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/Customers">Customers</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/CarRules">Acceptance Rules</Nav.Link>}
            <Nav.Link as={Link} to="/Login" onClick={() => this.props.updateLoginStatus(false,false,null)}>Logout</Nav.Link>
          </Nav>
        </Navbar> }
        {this.props.children}
      </div>
    );
  }
}
