import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

                              
export class AddInventory extends Component{
  static displayName = AddInventory.name;

  constructor(props) {
    super(props);
    this.state = {
      car: {
        year: "",
        make: "",
        model: "",
      },
      redirect: false,
      route: "AddInventory"
    }
  }

  setRedirect = (route) => {
    this.setState({
      redirect: true,
      route: route
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to= {this.state.route} />
    }
  }

  updateState = (event) => {
    var car = {...this.state.car};
    car[event.target.name] = event.target.value;
    this.setState({car});
  }

  postCar = (event) => {
    event.preventDefault();
    var car = this.state.car;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(car)
    };
    fetch('https://localhost:5001/api/inventory/addcar', requestOptions)
    .then(response => response).then(this.setRedirect("/"));
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <form onSubmit={this.postCar}>
          <p>
            <label>Year</label>
            <input name="year" type="text" onChange={this.updateState}></input>
          </p>
          <p>
            <label>Make</label>
            <input name="make" type="text" onChange={this.updateState}></input>
          </p>
          <p>
            <label>Model</label>
            <input name="model" type="text" onChange={this.updateState}></input>
          </p>
          <button type="submit">Submit</button>
          <button type="button" onClick={ () => this.setRedirect("/")}>Back</button>
        </form>
      </div>
    )
  }
}
