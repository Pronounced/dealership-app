import React, { Component } from 'react';
import Inventory from './components/Inventory';
import UserInventory from './components/UserInventory';
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
import { Messages } from './components/Messages';
import Registration from './components/Registration';
import { setUsers } from './features/userSlice';
import { setInventory } from './features/inventorySlice';
import { connect } from 'react-redux';
import { getData, postData, putData, deleteData, connection } from './actions/crud';

class App extends Component {
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
    years:[],
    messages: [],
  }

  addCar = (car) => {
    this.setState({
      inventoryData: this.state.inventoryData.concat(car),
      showForm: false,
      loading: true,
    });
    postData(car, `${this.props.connection}postcar`)
  };

  addCarRule = (rule) => {
    this.setState({
      carRules: this.state.carRules.concat(rule),
      loading: true,
    });
    postData(rule, `${this.props.connection}postrule`)
  };

  addMessage = (message) => {
    this.setState({
      messages: this.state.messages.concat(message),
      loading: true,
    });
    postData(message, `${this.props.connection}postmessage`)
  }

  deleteCarRule = (rule) => {
    let copyData = this.state.carRules;
    var index = copyData.indexOf(rule);
    copyData.splice(index, 1);
    this.setState({
      carRules: copyData,
    })
    deleteData(rule, `${this.props.connection}deleterule`)
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

  componentDidMount() {
    getData(`${this.props.connection}getcars`).then((data) => {
      this.props.setInventory(data);
    });
    getData(`${this.props.connection}getrules`).then((data) => {
      this.setState({ ...this.state, carRules: data, loading: false });
    });
    getData(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`).then((data) => {
      this.setState({...this.state, apiMakes: [data], loading: false });
    });
    getData(`${this.props.connection}getmessages`).then((data) => {
      this.setState({ ... this.state, messages: data, loading: false});
    })
    getData(`${this.props.connection}getusers`).then((data) => {
      this.props.setUsers(data);
    });
  }

  render() {
    const { messages, valueKey, isAdmin, view, currentUser, carRules, isLoggedIn, valueData, apiMakes } = this.state;
    return(
      <Router>
        <Layout>
          <Switch>
            <Route path="/Inventory" >
              <Inventory getData={getData} apiMakes={apiMakes} valueKey={valueKey} valueData={valueData} getMarketValue={this.getMarketValue} inventory={this.props.inventoryData} />
            </Route>
            <Route path="/UserInventory" >
              <UserInventory getData={getData} apiMakes={apiMakes} rules={carRules} inventory={this.props.inventoryData} currentUser={currentUser} view={view} addCar={this.addCar}/>
            </Route>
            <Route path="/Customers">
              <Customers users={this.props.userData} isAdmin={isAdmin}></Customers>
            </Route>
            <Route path="/CarRules">
              <CarRules rules={carRules} isAdmin={isAdmin} deleteCarRule={this.deleteCarRule} addCarRule={this.addCarRule}/>
            </Route>
            <Route path="/ContactUs">
              <ContactUs addMessage={this.addMessage}/>
            </Route>
            <Route path="/Messages">
              <Messages messages={messages}/>
            </Route>
            <Route path="/Registration">
              <Registration userData={this.props.userData} />
            </Route>
            <Route path="/">
              <Login users={this.props.userData} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

const mapStateToProps = (state) => { 
  return{
    userData: state.user.userData,
    inventoryData: state.inventory.inventoryData
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUsers: input => dispatch(setUsers(input)),
    setInventory: input => dispatch(setInventory(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);