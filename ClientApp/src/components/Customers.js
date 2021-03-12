import React, { Component } from 'react';
import { Table, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Customers extends Component {
  static displayName = Customers.name;

  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/Inventory">Car Dealership</Navbar.Brand>
          {this.props.isAdmin && <Nav.Link as={Link} to="/CarRules">Acceptance Rules</Nav.Link>}
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Login">Logout</Nav.Link>
          </Nav>
        </Navbar>
        <Table className="text-center" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users && this.props.users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}