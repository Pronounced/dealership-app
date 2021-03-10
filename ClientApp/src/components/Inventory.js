import React, { Component } from 'react';
import { Table, Navbar, Nav } from 'react-bootstrap';
//import { Route } from 'react-router';
//import { Redirect } from 'react-router-dom';

export class Inventory extends Component {
  static displayName = Inventory.name;

  render() {
    return (
       <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Car Dealership</Navbar.Brand>
          <Nav className="mr-auto">
            {this.props.isAdmin && <Nav.Link onClick={this.props.handleAdd}>Add Car to Inventory</Nav.Link>}
            {!this.props.isAdmin && <Nav.Link onClick={() => this.props.changeView("AddUserInventory")}>Submit a Car</Nav.Link>}
            {!this.props.isAdmin && <Nav.Link onClick={() => this.props.changeView("UserInventory")}>See My Cars</Nav.Link>}
          </Nav>
        </Navbar>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {this.props.inventory && this.props.inventory.filter(car => car.isApproved === true || car.seller === "admin").map((car, index) => (
              <tr key={index}>
                <td>{car.year}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
              </tr>
            ))}
          </tbody>    
        </Table>
       </div>
    );
  }
}