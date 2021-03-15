import React, { Component } from 'react';
import { Button, Card, Form, CardColumns } from 'react-bootstrap';

export default class ContactUs extends Component {
  static displayName = ContactUs.name;

  state = {
    name: "",
    phone: "",
    email: "",
    message: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = ({target}) => {
    const name = target.name
    const value = target.value
    this.setState({
      ...this.state, [name]: value, 
    });
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Contact Us</h1>
        <CardColumns>
          <Card>
            <Card.Body>
              <Card.Title>Phone Numbers:</Card.Title>
              <p>Main: <span style={{float: 'right'}}>555-555-5555</span></p>
              <p>Service: <span style={{float: 'right'}}>555-555-5555</span></p>
              <p>Sales: <span style={{float: 'right'}}>555-555-5555</span></p>
              <p>Parts: <span style={{float: 'right'}}>555-555-5555</span></p>
            </Card.Body>
          </Card>
          <Card border="light">
            <Card.Title>Leave a Message Below</Card.Title>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="First Last" onChange={this.handleChange} required></Form.Control>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" onChange={this.handleChange} required></Form.Control>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="example@email.com" onChange={this.handleChange} required></Form.Control>
                <Form.Label>Message</Form.Label>
                <Form.Control name="message" as="textarea" rows={3} onChange={this.handleChange} required></Form.Control>
                <Button type="submit">Submit</Button>
              </Form.Group>
            </Form>
          </Card>
          <Card>
            <Card.Title>Find Us</Card.Title>
            <Card.Body>
              Address: 123 Fake Street
            </Card.Body>
          </Card>
        </CardColumns>
            
      </div>
    )
  }
}