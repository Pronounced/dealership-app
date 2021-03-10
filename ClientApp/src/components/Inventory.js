import React, { Component } from 'react';
//import { Route } from 'react-router';
//import { Redirect } from 'react-router-dom';

export class Inventory extends Component {
  static displayName = Inventory.name;

  constructor(props) {
    console.log("constructor")
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      inventory: [],
      redirect: false,
      route: "Inventory"
    }
    console.log(this.state.inventory)
  }

  // setRedirect = (route) => {
  //   this.setState({
  //     redirect: true,
  //     route: route
  //   })
  // }
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to= {this.state.route} />
  //   }
  // }

  getCars = () => {
    fetch("https://localhost:5001/api/inventory/")
    .then(response => response.json())
    .then((result) => {
        this.setState({
          isLoaded: true,
          inventory: result
        });
      }
    )
  }

  componentDidMount() {
    console.log("Mount")
    this.getCars();
    console.log(this.state.inventory)
  }

  render() {
    console.log("render")
    console.log(this.state.inventory)
    return (
       <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.map(i => (
              <tr key={i.guid}>
                <td>{i.year}</td>
                <td>{i.make}</td>
                <td>{i.model}</td>
              </tr>
            ))}
          </tbody>    
        </table>
        <button type="button" onClick={ () => {this.props.changeView("AddInventory")}}>Add Car</button>
        {/* <button type="button" onClick={() => this.setRedirect("AddInventory")}>Add Car</button> */}
       </div>
    );
  }
}