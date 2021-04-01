import React, { Component } from 'react';
import { Form, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class Registration extends Component{
  static displayName = Registration.name;

  state = {
    user: {
      username: "",
      password: "",
      email: "",
      isAdmin: false
    },
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var error = false;
    this.props.userData.map((user) => {
      if((user.email === this.state.user.email) || (user.username === this.state.user.username)) {
        error = true;
      }
    });
    if(!error) {
      return this.props.addUser(this.state.user);
    }
  }

  handleInputChange = ({target}) => {
    const name = target.name
    const value = target.value
    var userState = {...this.state.user};
    userState[name] = value;
    this.setState({
      ...this.state,
      user: userState 
    });
  };

  render() {
    return (
      <div>
        <Row style={{ height: '20vh'}}></Row>
        <Row>
        <Col></Col>
          <Col md="auto">
            <Col></Col>
            <Card style={{ width: '22rem' }}>
              <Card.Header as="h5">Register</Card.Header>
              <Card.Body>
                <Form id="regform" name="registrationForm" onSubmit={this.handleSubmit}>
                  <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" onChange={this.handleInputChange} autoComplete="new-password" required></Form.Control>
                    <br></br>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" onChange={this.handleInputChange} required></Form.Control>
                    <br></br>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="example@email.com" onChange={this.handleInputChange} required></Form.Control>
                    <br></br>
                    <Button type="submit" block>Submit</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <Col></Col>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
  }
}