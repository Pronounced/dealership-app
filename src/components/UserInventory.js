import React, { Component } from 'react';
import { Table, Accordion, Card, Button } from 'react-bootstrap';
import AddInventory from './AddInventory';
import { connect } from 'react-redux';

class UserInventory extends Component {
  static displayName = UserInventory.name;

  render() {
    return (
       <div>
        <Table responsive striped bordered hover variant="dark">
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
                  <AddInventory apiMakes={this.props.apiMakes}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>
       </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return{
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(UserInventory);