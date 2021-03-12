import React, { Component } from 'react';
import { Inventory } from './components/Inventory';
import { AddInventory } from './components/AddInventory';
import { UserInventory } from './components/UserInventory';
import Login  from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  state = {
    showForm: false,
    inventoryData: [],
    userData: [],
    nCar: null,
    isLoggedIn: false,
    isAdmin: false,
    view: null,
    currentUser: null
  }

  handleAdd = () => {
    this.setState({
      ...this.state,
      showForm: !this.state.showForm,
    });
  };

  updateCar = (guid, status) => {
    let copyData = this.state.inventoryData;
    this.setState({
      ...this.state,
      inventoryData: copyData.map(car => {
        if(car.guid === guid)
        {
          car.isApproved = status;
        }

        return car
      })
    });
  }

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

  updateLoginStatus = (status, isAdmin, user) => {
    this.setState({
      ...this.state,
      isLoggedIn: status,
      isAdmin: isAdmin,
      currentUser: user
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
    const { inventoryData, userData, isAdmin, view, currentUser } = this.state;
    return(
      <Router>
        <Switch>
          <Route path="/Inventory" >
            <Inventory updateCar={this.updateCar} addCar={this.addCar} handleAdd={this.handleAdd} isAdmin={isAdmin} inventory={inventoryData} />
          </Route>
          <Route path="/UserInventory" >
            <UserInventory inventory={inventoryData} currentUser={currentUser} view={view} addCar={this.addCar}/>
          </Route>
          <Route path="/AddInventory" >
            <AddInventory currentUser={currentUser} addCar={this.addCar} />
          </Route>
          <Route path="/">
            <Login updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} users={userData} />
          </Route>
        </Switch>
      </Router>
    )
  }
}
