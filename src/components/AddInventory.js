import React, { Component } from 'react';
import { Button, Form, Row, Col, Card, Container, Alert} from 'react-bootstrap';
import years from '../years.json'
import { connect } from 'react-redux';
import { addCar } from '../features/inventorySlice';
import { getData } from '../actions/crud';

class AddInventory extends Component{
  static displayName = AddInventory.name;

  state = {
    car: {
      year: "",
      make: "",
      model: "",
      color: "",
      seller: this.props.currentUser,
      vin: "",
      isApproved: this.props.isAdmin ? true : false,
      image: "",
    },
    alert: false,
    alertMessage: "",
    modelData: [],
  }

  handleReset = () => {
    this.setState({
      car:{}
    })
  }

  handleChange = ({target}) => {
    var models = null;
    const name = target.name;
    const value = target.value;
    var carState = {...this.state.car};
    carState[name] = value;
    this.setState({
      seller: this.props.currentUser,
      car: carState,
    });
    if(target.name === "make" || target.name === "year")
    {
      getData(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${carState.make}/modelyear/${carState.year}?format=json`)
      .then((data) => {
        console.log(data);
        this.setState({...this.state, modelData: data.Results});
      });
    }
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    var badVin = "";
    var vinData = await getData(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${this.state.car.vin}?format=json`);
    console.log("vin",vinData)
    if(!this.props.isAdmin) {
      this.props.rulesData.map((rule) => {
        if(rule.startYear <= parseInt(this.state.car.year) && rule.endYear >= parseInt(this.state.car.year)){
          if(rule.make.toLowerCase() === this.state.car.make.toLowerCase())
          {
            console.log("make", this.state.car.make);
            if(rule.model.toLowerCase() === this.state.car.model.toLowerCase())
            {
              if(rule.color.toLowerCase() === this.state.car.color.toLowerCase())
              {
                if(vinData) {
                  if(vinData.Results[0].Make.toLowerCase() === this.state.car.make.toLowerCase())
                  {
                    badVin = "";
                    this.props.addCar(this.state.car);
                  }
                  else if (badVin === "") {
                    badVin = true;
                  }
                }
                else if (badVin === ""){
                  badVin = true;
                }
              } else if (badVin === ""){
                badVin = false;
              }
            } else if (badVin === ""){
              badVin = false;
            }
          } else if (badVin === ""){
            badVin = false;
          }
        }else if (badVin === ""){
          badVin = false;
        }

        return true;
      }
    )
    if(badVin !== ""){
      console.log("alert1")

      this.setState({
        alertMessage: badVin ? "VIN is not valid" : "We are not accepting vehicles of this type at the moment",
        alert:true
      });
    }
  } 
  else {
     if(vinData) 
     { 
       console.log(vinData)
        if(vinData.Results[0].Make.toLowerCase() === this.state.car.make.toLowerCase())
        {
          console.log(vinData === this.state.car.make);
          return this.props.addCar(this.state.car);
        }
        else {
          badVin = true;
          console.log("alert2")

          this.setState({
            alertMessage: badVin ? "VIN is not valid" : "We are not accepting vehicles of this type at the moment",
            alert:true
          })
        }
     }
      else {
        console.log("alert3")

        badVin = true;
        this.setState({
          alertMessage: badVin ? "VIN is not valid" : "We are not accepting vehicles of this type at the moment",
          alert:true
        })
      }
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Alert show={this.state.alert} variant="danger">
          <Alert.Heading>Car was denied</Alert.Heading>
            <p>{this.state.alertMessage}</p>
          </Alert>
          <Row style={{ height: '5vh'}}></Row>
          <Row>
          <Col></Col>
            <Col md="auto">
              <Card >
                <Card.Header as="h5">Add Car</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                      <Form.Label>VIN</Form.Label>
                      <Form.Control name="vin" onChange={this.handleChange} minLength="17" maxLength="17" required/>
                      <Form.Label>Year</Form.Label>
                      <Form.Control name="year" as="select" onChange={this.handleChange}>
                        <option>...</option>
                        {
                          years[0].years.map(year => {
                            return <option key={year}>{year}</option>
                          })
                        }
                      </Form.Control>
                      <Form.Label>Make</Form.Label>
                      <Form.Control name="make" as="select" onChange={this.handleChange} required>
                        <option>...</option>
                        {this.props.apiMakes[0].Results.map((make, index) => {
                            return <option key={index} value={make.MakeID}> {make.MakeName} </option>
                          })
                        }
                      </Form.Control>
                      <Form.Label>Model</Form.Label>
                      <Form.Control name="model" as="select" onChange={this.handleChange} required>
                        <option>...</option>
                        {this.state.modelData.map((model, index) => {
                            return <option key={index} value={model.Model_Name}> {model.Model_Name} </option>
                          })
                        }
                      </Form.Control>
                      <Form.Label>Color</Form.Label>
                      <Form.Control name="color" as="select" onChange={this.handleChange} required>
                        <option>...</option>
                        <option value="blue">blue</option>
                        <option value="yellow">yellow</option>
                        <option value="green">green</option>
                        <option value="red">red</option>
                      </Form.Control>
                      <Form.Label>Input Image URL</Form.Label>
                      <Form.Control name="image" onChange={this.handleChange}/>
                      {/* <div>
                        <Form.File name="image" label="Upload Car Picture(Max Size: 16MB)" onChange={this.handleChange} />
                        <Button variant="secondary" onClick={this.handleUpload}>Upload</Button>
                      </div> */}
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

const mapStateToProps = (state) => { 
  return{
    currentUser: state.user.currentUser,
    isAdmin: state.user.isAdmin,
    rulesData: state.rules.rulesData
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCar: input => dispatch(addCar(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);