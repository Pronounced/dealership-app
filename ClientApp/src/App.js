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
    nCar: [],
    isLoggedIn: false,
    isAdmin: false,
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
      }),
      nCar: copyData.filter(car => car.guid === guid)
    });
  }

  addCar = (car) => {
    this.setState({
      inventoryData: this.state.inventoryData.concat(car),
      showForm: false,
      loading: true
    });
  };

  getInventoryData = async (url) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  getUserData = async (url) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  postData = async (data, url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  };

  putData = async (data, url) => {
    console.log("putting");
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  }

  updateLoginStatus = (status, isAdmin, user) => {
    this.setState({
      ...this.state,
      isLoggedIn: status,
      isAdmin: isAdmin,
      currentUser: user,
      view: 'Inventory'
    });
  }

  componentDidMount() {
    this.getInventoryData("https://localhost:5001/api/inventory/").then((data) => {
      this.setState({ ...this.state, inventoryData: data, loading: false });
    });
    this.getUserData("https://localhost:5001/api/users/").then((data) => {
      this.setState({ ...this.state, userData: data, loading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const plength = prevState.inventoryData.length;
    const nlength = this.state.inventoryData.length;
    if (plength !== 0 && plength !== nlength) {
      const nCar = this.state.inventoryData[nlength - 1]
      this.postData(nCar, "https://localhost:5001/api/inventory/addcar").then(
        (res) => {
          console.log("posted new car!!", res);
        }
      );
    } else if (plength !== 0 && plength === nlength)
    {
      const nCar = this.state.nCar[0];
      this.putData(nCar, "https://localhost:5001/api/inventory/updatecar");
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
