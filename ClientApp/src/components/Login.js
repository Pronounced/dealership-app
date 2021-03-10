import React from "react";
import { Button, Card, Form, Container, Col, Row } from 'react-bootstrap';

export default class Login extends React.Component {

  state={ 
    username: "",
    password: "",
    userList: [],
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
    event.preventDefault();
    console.log(this.props.login);
    if(!this.props.login)
    {
      console.log(this.props.login);
      this.props.users.map(element =>
      {
        if(this.state.username === element.username && this.state.password === element.password)
        {
          if(element.isAdmin === true)
          {
            this.props.updateLoginStatus(true,true);
          } else {
            this.props.updateLoginStatus(true);
          }
          console.log(this.props.login);
        }
        return true;
      })
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
                  <Button onClick={this.skip}>Skip</Button>
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

