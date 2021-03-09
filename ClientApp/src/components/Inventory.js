import React, { Component } from 'react';
//import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

export class Inventory extends Component {
  static displayName = Inventory.name;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      inventory: [],
      redirect: false,
      route: "Inventory"
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

  componentDidMount() {
    fetch("https://localhost:5001/api/inventory/")
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          inventory: result
        });
      }
    )
  }

  render() {
    return (
       <div>
        {this.renderRedirect()}
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
        {/* <button type="button" onClick={ () => {this.props.changeView("AddInventory")}}>Add Car</button> */}
        <button type="button" onClick={() => this.setRedirect("AddInventory")}>Add Car</button>
       </div>
    );
  }
}