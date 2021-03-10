import React, { Component } from 'react';
//import { Route } from 'react-router';
import { Inventory } from './components/Inventory';
import { AddInventory } from './components/AddInventory';
import Login  from './components/Login';
import { Button } from 'react-bootstrap';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  state = {
    showForm: false,
    inventoryData: [],
    userData: [],
    nCar: null,
    isLoggedIn: false,
    isAdmin: false
  }

  handleAdd = () => {
    this.setState({
      ...this.state,
      showForm: !this.state.showForm,
    });
  };

  addCar = (car) => {
    console.log("car to add", car);
    this.setState({
      inventoryData: this.state.inventoryData.concat(car),
      showForm: false,
      loading: true
    });
  };

  getInventoryData = async (url) => {
    console.log("fetching");
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  getUserData = async (url) => {
    console.log("fetching");
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  postData = async (data, url) => {
    console.log("posting");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  };

  updateLoginStatus = (status, isAdmin) => {
    this.setState({
      ...this.state,
      isLoggedIn: status,
      isAdmin: isAdmin
    });
  }

  componentDidMount() {
    console.log("didMount");
    this.getInventoryData("https://localhost:5001/api/inventory/").then((data) => {
      this.setState({ ...this.state, inventoryData: data, loading: false });
    });
    this.getUserData("https://localhost:5001/api/users/").then((data) => {
      this.setState({ ...this.state, userData: data, loading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    const plength = prevState.inventoryData.length;
    const nlength = this.state.inventoryData.length;
    console.log("plength", plength);
    console.log("nlength", nlength);
    if (plength !== 0 && plength !== nlength) {
      const nCar = this.state.inventoryData[nlength - 1]
      console.log("nCar", nCar);
      console.log("lengths don't match");
      this.postData(nCar, "https://localhost:5001/api/inventory/addcar").then(
        (res) => {
          console.log("posted new car!!", res);
        }
      );
    }
  }

  render() {
    console.log("render state", this.state);
    const { showForm, inventoryData, isLoggedIn, userData, isAdmin } = this.state;
    if(!isLoggedIn) {
      return (
        <Login updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} login={isLoggedIn} users={userData}/>
      )
    } else if (showForm)
    {
      return(<AddInventory addCar={this.addCar} />)
    } else
    {
      if(isAdmin)
      {
        return (<div>
          <Inventory inventory={inventoryData} />
          <Button onClick={this.handleAdd}>{showForm ? "Cancel" : "Add"}</Button>
        </div>)

      } else {
        return (<Inventory inventory={inventoryData} />)
      }
    }
    
    // else {
    //   return (
    //     <>
    //       {showForm ? (
    //         <AddInventory addCar={this.addCar} />
    //       ) : (
    //         <Inventory inventory={inventoryData} />
    //       )}
    //       <Button onClick={this.handleAdd}>{showForm ? "Cancel" : "Add"}</Button>
    //     </>
    //   );
    // }
  }
}
