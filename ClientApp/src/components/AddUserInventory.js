import React, { Component } from 'react';
import { Button, Form, Row, Col, Card, Container} from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';

                              
export class AddInventory extends Component{
  static displayName = AddInventory.name;

    state = {
      year: "",
      make: "",
      model: "",
    }

  handleChange = ({target}) => {
    const name = target.name
    const value = target.value
    this.setState({...this.state, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCar(this.state);
  };

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
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Year</Form.Label>
                      <Form.Control name="year" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Make</Form.Label>
                      <Form.Control name="make" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Model</Form.Label>
                      <Form.Control name="model" type="text" onChange={this.handleChange}></Form.Control>
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
