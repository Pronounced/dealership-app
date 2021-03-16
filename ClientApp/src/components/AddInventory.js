import React, { Component } from 'react';
import { Button, Form, Row, Col, Card, Container, Alert} from 'react-bootstrap';
import vinGenerator from 'vin-generator';
                              
export class AddInventory extends Component{
  static displayName = AddInventory.name;

    state = {
      car: {
        year: "",
        make: "",
        model: "",
        color: "",
        seller: this.props.currentUser,
        vin: vinGenerator.generateVin(),
        isApproved: this.props.isAdmin ? true : false,
      },
      alert: false,
    }

  handleChange = ({target}) => {
    const name = target.name
    const value = target.value
    var carState = {...this.state.car};
    carState[name] = value;
    this.setState({
      seller: this.props.currentUser,
      car: carState
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    if(!this.props.isAdmin) {
      this.props.rules.map((rule) => {
        if(parseInt(rule.startYear)<= parseInt(this.state.car.year) && parseInt(rule.endYear)>= parseInt(this.state.car.year)){
          if(rule.make === this.state.car.make)
          {
            if(rule.model === this.state.car.model)
            {
              if(rule.color === this.state.car.color)
              {
                return this.props.addCar(this.state.car);
              }
            }
          }
        }
        else {
          this.setState({
            alert:true
          })
        }
        return true;
      }
    )} else {
      return this.props.addCar(this.state.car);
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Alert show={this.state.alert} variant="danger">
          <Alert.Heading>Car was denied</Alert.Heading>
            <p>We are not accepting vehicles of this type at the moment</p>
          </Alert>
          <Row style={{ height: '5vh'}}></Row>
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

