import React, { Component } from 'react';

export class Inventory extends Component {
  static displayName = Inventory.name;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      inventory : []
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
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
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

            {/* {this.state.inventory.map(function(value, key) {
              <tr key={}></tr>
            })} */}
          </tbody>    
        </table>
        <button type="button" onClick={ () => {this.props.view("AddInventory")}}>Add Car</button>
       </div>
    );
  }
}