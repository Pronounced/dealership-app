import React from "react";
import { Button, Card, Form, Container, Col, Row } from 'react-bootstrap';

export default class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={ 
      username: "",
      password: "",
      userList: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.state.isLogined)
    {
      this.state.userList.map(element =>
      {
        if(this.state.username === element.username && this.state.password === element.password)
        {
          this.props.onLogChange(true);
          this.props.changeView("Inventory");
        }
        return true;
      })
    }
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/users/")
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          userList: result
        });
      }
    )  
  }
    
  render() {
    return (
      <div >
        <Container fluid>
          <Row style={{ height: '33vh'}}></Row>
          <Row>
          <Col></Col>
            <Col md="auto">
              <Card style={{ width: '18rem'}}>
                <Card.Header as="h5">Login</Card.Header>
                <Card.Body>
                  <Form name="loginForm" onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group >
                      <Form.Label>Username</Form.Label>
                      <Form.Control name="username" type="text" onChange={this.handleInputChange}></Form.Control>
                      <Form.Label>Password</Form.Label>
                      <Form.Control name="password" type="password" onChange={this.handleInputChange}></Form.Control>
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={this.handleSubmit} block>Submit</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

