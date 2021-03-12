import React, { Component } from 'react';
import { Table, Accordion, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { AddInventory } from './AddInventory';
import { Link } from 'react-router-dom';

export class UserInventory extends Component {
  static displayName = UserInventory.name;

  render() {
    return (
       <div>
       <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/Inventory">Car Dealership</Navbar.Brand>
          <Nav className="mr-auto">
            {!this.props.isAdmin && <Nav.Link as={Link} to="/Inventory">See Inventory</Nav.Link>}
            <Nav.Link as={Link} to="/Login">Logout</Nav.Link> {/*href to clear state */}
          </Nav>
        </Navbar>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>color</th>
              <th>Approved</th>
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
                <td>{car.color}</td>
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
                  <AddInventory isAdmin={this.props.isAdmin} rules={this.props.rules} addCar={this.props.addCar} currentUser={this.props.currentUser}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>
       </div>
    );
  }
}