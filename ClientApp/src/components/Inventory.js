import React, { Component } from 'react';
import { Table, Navbar, Nav, Button, Card, Accordion } from 'react-bootstrap';
import { AddInventory } from './AddInventory';
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
            {!this.props.isAdmin && <Nav.Link onClick={() => this.props.changeView("UserInventory")}>See My Cars</Nav.Link>}
          </Nav>
        </Navbar>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Status</th>
              {this.props.isAdmin && <th>Set Status</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.inventory && this.props.inventory.filter(car => car.isApproved === true || this.props.isAdmin === true).map((car, index) => (
              <tr key={index}>
                <td>{car.year}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.isApproved.toString()}</td>
                {this.props.isAdmin && 
                  <td>
                    <Button>Approve</Button>
                    <Button>Deny</Button>
                  </td>
                }
              </tr>
            ))}
          </tbody>    
        </Table>
        {this.props.isAdmin && 
          <Accordion defaultActiveKey="1">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Add Car
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <AddInventory isAdmin={this.props.isAdmin} addCar={this.props.addCar} currentUser={this.props.currentUser}/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
        }
       </div>
    );
  }
}