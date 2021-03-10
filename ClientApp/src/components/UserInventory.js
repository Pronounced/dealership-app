import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//import { Route } from 'react-router';
//import { Redirect } from 'react-router-dom';

export class Inventory extends Component {
  static displayName = Inventory.name;

  render() {
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
            {this.props.inventory && this.props.inventory.filter((car, index) => (
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