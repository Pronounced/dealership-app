import React, { Component } from 'react';
import { Table, Button, Card, Accordion, Image, Col } from 'react-bootstrap';
import { AddInventory } from './AddInventory';

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
              <th>Color</th>
              <th>Image</th>
              {this.props.isAdmin && <th>Approved</th>}
              <th>Market Value</th>
              <th>Get Market Value</th>
              {this.props.isAdmin && <th>Set Status</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.inventory && this.props.inventory.filter(car => car.isApproved === true || this.props.isAdmin === true).map((car, index) => (
              <tr key={index}>
                <td>{car.year}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td style={{width:256, height:256}}>
                  <Col><Image src={`${car.image}`} fluid/></Col>
                </td>
                {this.props.isAdmin && <td>{car.isApproved.toString()}</td>}
                {this.props.isAdmin && 
                  <td>
                    <Button onClick={() => this.props.updateCar(car.vin, true)}>Approve</Button>
                    <Button onClick={() => this.props.updateCar(car.vin, false)}>Deny</Button>
                  </td>
                }
                <td>{car.vin === this.props.valueKey && this.props.valueData}</td>
                <td><Button onClick={() => this.props.getMarketValue(car)}>Get Value</Button></td>
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
                    <AddInventory getData={this.props.getData} apiMakes={this.props.apiMakes} isAdmin={this.props.isAdmin} addCar={this.props.addCar} currentUser={this.props.currentUser}/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
        }
       </div>
    );
  }
}