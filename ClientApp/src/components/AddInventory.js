import React, { Component } from 'react';
import { Button, Form, Row, Col, Card, Container} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
//import { Redirect } from 'react-router-dom';

                              
export class AddInventory extends Component{
  static displayName = AddInventory.name;

    state = {
      year: "",
      make: "",
      model: "",
      color: "",
      seller: this.props.currentUser,
      guid: uuidv4(),
      isApproved: ""
    }

  handleChange = ({target}) => {
    const name = target.name
    const value = target.value
    this.setState({...this.state, [name]: value, 
      seller: this.props.currentUser,
      isApproved: this.props.isAdmin ? true : false
    });
  };



  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.props.isAdmin) {
      this.props.rules.map((rule) => {
        if(parseInt(rule.startYear)<= parseInt(this.state.year) && parseInt(rule.endYear)>= parseInt(this.state.year))
        {
          if(rule.make === this.state.make)
          {
            if(rule.model === this.state.model)
            {
              if(rule.color === this.state.color)
              {
                return this.props.addCar(this.state);
              }
            }
          }
        }
      })
    } else {
      return this.props.addCar(this.state);
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row style={{ height: '15vh'}}></Row>
          <Row>
          <Col></Col>
            <Col md="auto">
              <Card style={{ width: '18rem'}}>
                <Card.Header as="h5">Add Car</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                      <Form.Label>Year</Form.Label>
                      <Form.Control name="year" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Make</Form.Label>
                      <Form.Control name="make" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Model</Form.Label>
                       <Form.Control name="model" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Color</Form.Label>
                      <Form.Control name="color" type="text" onChange={this.handleChange}></Form.Control>
                      <Button type="submit">Submit</Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

