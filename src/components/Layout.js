import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateLoginStatus } from '../features/userSlice';

class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        { this.props.isLoggedIn && <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/Inventory">Car Dealership</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Inventory">See Inventory</Nav.Link>
            {!this.props.isAdmin && <Nav.Link as={Link} to="/UserInventory">See My Cars</Nav.Link>}
            {!this.props.isAdmin && <Nav.Link as={Link} to="/ContactUs">Contact Us</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/Customers">Customers</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/CarRules">Acceptance Rules</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/Messages">Messages</Nav.Link>}
            <Nav.Link as={Link} to="/Login" onClick={() => this.props.updateLoginStatus([false,false,null])}>Logout</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar> }
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return{
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginStatus: input => dispatch(updateLoginStatus(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);