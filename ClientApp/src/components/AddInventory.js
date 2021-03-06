import React, { Component } from 'react';
                              
export class AddInventory extends Component{
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      make: "",
      model: "",
      guid: null
    }
  }

  updateState = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  postCar = () => {
    var inventory = this.state;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(inventory)
    };
    fetch('https://localhost:5001/api/inventory/addcar', requestOptions)
    .then(response => response.json());
  }

  render() {
    return (
      <div>
        <form onSubmit={this.postCar}>
          <label>Year</label>
          <input name="year" type="text" onChange={this.updateState}></input>
          <label>Make</label>
          <input name="make" type="text" onChange={this.updateState}></input>
          <label>Model</label>
          <input name="model" type="text" onChange={this.updateState}></input>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => {this.props.view("Inventory")}}>back</button>
        </form>
      </div>
    )
  }
}
