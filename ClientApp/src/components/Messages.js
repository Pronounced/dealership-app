import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Messages extends Component{
  static displayName = Messages.name;

  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.props.messages.map((message, index) => (
              <tr key={index}>
                <td>{message.name}</td>
                <td>{message.phoneNumber}</td>
                <td>{message.email}</td>
                <td style={{width: 500, maxWidth: 500,wordWrap:'break-word'}}>{message.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}