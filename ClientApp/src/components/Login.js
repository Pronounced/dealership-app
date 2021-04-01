import React from "react";
import { Button, Card, Form, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {

  state={ 
    username: "",
    password: "",
  };

  handleInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
      })
  }

  skip = () => {
    this.props.updateLoginStatus(true);
  }

  handleSubmit = (event) => {
    var auth = false;
    if(this.state.username.length === 0 || this.state.password.length === 0) {
      event.preventDefault();
    } else {
      this.props.users.map(element =>
        {
          if(this.state.username === element.username && this.state.password === element.password)
          {
            if(element.isAdmin)
            {
              this.props.updateLoginStatus(true,true,element.username);
            } else {
              this.props.updateLoginStatus(true,false,element.username);
            }
            auth = true;
          }
          return true;
        })
    }
    if(!auth){
      event.preventDefault();
    }
  }
    
  render() {
    return (
      <div >
        <Container fluid>
          <Row style={{ height: '33vh'}}></Row>
          <Row>
          <Col></Col>
            <Col md="auto">
              <Col></Col>
              <Card >
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
                  <Link to="/Inventory"> <Button onClick={this.handleSubmit} block>Submit</Button> </Link>
                  <br></br>
                  <Link to="/Registration"> <Button block>Register</Button> </Link>
                </Card.Footer>
              </Card>
              <Col></Col>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

