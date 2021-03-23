import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Customers extends Component {
  static displayName = Customers.name;

  render() {
    return(
      <div>
        <Table responsive className="text-center" striped bordered hover variant="dark">
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