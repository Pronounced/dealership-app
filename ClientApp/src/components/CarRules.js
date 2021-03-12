import React, { Component } from 'react';
import { Table, Navbar, Nav, Button, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class CarRules extends Component {
  static displayName = CarRules.name;

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/Inventory">Car Dealership</Navbar.Brand>
          <Nav className="mr-auto">
            {!this.props.isAdmin && <Nav.Link as={Link} to="/UserInventory">See My Cars</Nav.Link>}
            {this.props.isAdmin && <Nav.Link as={Link} to="/Customers">Customers</Nav.Link>}
            <Nav.Link as={Link} to="/Login">Logout</Nav.Link>
          </Nav>
        </Navbar>
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
              <th>Name</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Color</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rules && this.props.rules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.name}</td>
                <td>{rule.startYear}</td>
                <td>{rule.endYear}</td>
                <td>{rule.make}</td>
                <td>{rule.model}</td>
                <td>{rule.color}</td>
                <td><Button>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}