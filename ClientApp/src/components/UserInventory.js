import React, { Component } from 'react';
import { Table, Accordion, Card, Button } from 'react-bootstrap';
import { AddInventory } from './AddInventory';
//import { Route } from 'react-router';
//import { Redirect } from 'react-router-dom';

export class UserInventory extends Component {
  static displayName = UserInventory.name;

  render() {
    console.log("inventory", this.props.inventory);
    return (
       <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
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
              </tr>
            ))}
          </tbody>    
        </Table>
        {/* <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add Car
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddInventory />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion> */}
       </div>
    );
  }
}