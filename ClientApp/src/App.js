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
import Customers from './components/Customers';
import CarRules from './components/CarRules';
import ContactUs from './components/ContactUs';
import Layout from './components/Layout';
import fs from 'fs';

export default class App extends Component {
  static displayName = App.name;

  state = {
    showForm: false,
    inventoryData: [],
    userData: [],
    nCar: [],
    isLoggedIn: false,
    isAdmin: false,
    currentUser: null,
    carRules: [],
    postArray: [],
    url: null,
    key: "VA_DEMO_KEY",
    valueData: "",
    valueKey: null,
    apiMakes: [],
    apiModels: [],
    years:[]
  }

  handleAdd = () => {
    this.setState({
      ...this.state,
      showForm: !this.state.showForm,
    });
  };

  updateCar = (vin, status) => {
    let copyData = this.state.inventoryData;
    this.setState({
      ...this.state,
      inventoryData: copyData.map(car => {
        console.log("car vin", car.vin);
        console.log("vin", vin);
        if(car.vin === vin)
        {
          car.isApproved = status;
        }
        return car
      })
    });
    this.putData(copyData.filter(car => car.vin === vin)[0], "http://localhost:3001/putcar");
  }

  addCar = (car) => {
    this.setState({
      inventoryData: this.state.inventoryData.concat(car),
      showForm: false,
      loading: true,
    });
    this.postData(car, 'http://localhost:3001/postcar')
  };

  addCarRule = (rule) => {
    this.setState({
      carRules: this.state.carRules.concat(rule),
      loading: true,
    });
    this.postData(rule, 'http://localhost:3001/postrule')
  };

  deleteCarRule = (rule) => {
    let copyData = this.state.carRules;
    var index = copyData.indexOf(rule);
    copyData.splice(index, 1);
    this.setState({
      carRules: copyData,
    })
    this.deleteData(rule, 'http://localhost:3001/deleterule')
  }

  getMarketValue = async (car) => {
    const response = 
      await fetch("https://marketvalue.vinaudit.com/getmarketvalue.php?key=VA_DEMO_KEY&vin=" + car.vin + "&format=json");
    return response.json().then((data) => {
      this.setState({
        ...this.state,
        valueData: data.mean,
        valueKey: car.vin
      })
    }); 
  }

  getData = async (url) => {
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

  deleteData = async (data, url) => {
    console.log("deleting");
    const response = await fetch(url, {
      method: "DELETE",
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
    });
  }

  componentDidMount() {
    this.getData("http://localhost:3001/").then((data) => {
      this.setState({ ...this.state, inventoryData: data, loading: false });
    });
    this.getData("http://localhost:3001/getusers").then((data) => {
      this.setState({ ...this.state, userData: data, loading: false });
    });
    this.getData("http://localhost:3001/getrules").then((data) => {
      this.setState({ ...this.state, carRules: data, loading: false });
    });
    this.getData("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json").then((data) => {
      this.setState({...this.state, apiMakes: [data], loading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }
  

  render() {
    const { valueKey, inventoryData, userData, isAdmin, view, currentUser, carRules, isLoggedIn, valueData, apiMakes } = this.state;
    return(
      <Router>
        <Layout updateLoginStatus={this.updateLoginStatus} isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
          <Switch>
            <Route path="/Inventory" >
              <Inventory getData={this.getData} apiMakes={apiMakes} valueKey={valueKey} valueData={valueData} getMarketValue={this.getMarketValue} currentUser={currentUser} updateCar={this.updateCar} addCar={this.addCar} handleAdd={this.handleAdd} isAdmin={isAdmin} inventory={inventoryData} />
            </Route>
            <Route path="/UserInventory" >
              <UserInventory getData={this.getData} apiMakes={apiMakes} rules={carRules} inventory={inventoryData} currentUser={currentUser} view={view} addCar={this.addCar}/>
            </Route>
            <Route path="/Customers">
              <Customers users={userData} isAdmin={isAdmin}></Customers>
            </Route>
            <Route path="/CarRules">
              <CarRules rules={carRules} isAdmin={isAdmin} deleteCarRule={this.deleteCarRule} addCarRule={this.addCarRule}/>
            </Route>
            <Route path="/ContactUs">
              <ContactUs />
            </Route>
            <Route path="/">
              <Login updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} users={userData} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}
