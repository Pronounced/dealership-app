import React, { Component } from 'react';
import { Table, Button, Card, Accordion, Form } from 'react-bootstrap';

export default class CarRules extends Component {
  static displayName = CarRules.name;

  state = {
    name: "",
    startYear: "",
    endYear: "",
    make: "",
    model: "",
    color: "",
  }

handleChange = ({target}) => {
  const name = target.name
  const value = target.value
  this.setState({...this.state, [name]: value, 
  });
};

handleSubmit = (event) => {
  event.preventDefault();
  this.props.addCarRule(this.state);
};


  render() {
    return (
      <div>
        <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
              <th>Name</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Color</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rules && this.props.rules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.name}</td>
                <td>{rule.startYear}</td>
                <td>{rule.endYear}</td>
                <td>{rule.make}</td>
                <td>{rule.model}</td>
                <td>{rule.color}</td>
                <td><Button onClick={() => this.props.deleteCarRule(rule)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
          <Accordion defaultActiveKey="1">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Add Car Rule
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <Card style={{ width: '18rem'}}>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control name="name" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>Start Year</Form.Label>
                      <Form.Control name="startYear" type="text" onChange={this.handleChange}></Form.Control>
                      <Form.Label>End Year</Form.Label>
                      <Form.Control name="endYear" type="text" onChange={this.handleChange}></Form.Control>
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
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
      </div>
    )
  }
}