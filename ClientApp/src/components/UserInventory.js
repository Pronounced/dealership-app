import React, { Component } from 'react';
import { Table, Accordion, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { AddInventory } from './AddInventory';
//import { Route } from 'react-router';
//import { Redirect } from 'react-router-dom';

export class UserInventory extends Component {
  static displayName = UserInventory.name;

  render() {
    console.log("inventory", this.props.inventory);
    return (
       <div>
       <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Car Dealership</Navbar.Brand>
          <Nav className="mr-auto">
            {!this.props.isAdmin && <Nav.Link onClick={() => this.props.changeView("Inventory")}>See Inventory</Nav.Link>}
          </Nav>
        </Navbar>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.inventory && this.props.inventory
            .filter(car => car.seller === this.props.currentUser)
            .map((car, index) => (
              <tr key={index}>
                <td>{car.year}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.isApproved.toString()}</td>
              </tr>
            ))}
          </tbody>    
        </Table>
        <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add Car
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddInventory addCar={this.props.addCar} currentUser={this.props.currentUser}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>
       </div>
    );
  }
}