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
import { setRules } from './features/rulesSlice';
import { connect } from 'react-redux';
import { getData } from './actions/crud';
import { setMessages } from './features/messageSlice';

class App extends Component {
  static displayName = App.name;

  state = {
    key: "VA_DEMO_KEY",
    valueData: "",
    valueKey: null,
    apiMakes: [],
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
      this.props.setRules(data);
    });
    getData(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`).then((data) => {
      this.setState({...this.state, apiMakes: [data], loading: false });
    });
    getData(`${this.props.connection}getmessages`).then((data) => {
      this.props.setMessages(data);
    })
    getData(`${this.props.connection}getusers`).then((data) => {
      this.props.setUsers(data);
    });
  }

  render() {
    const { valueKey, valueData, apiMakes } = this.state;
    return(
      <Router>
        <Layout>
          <Switch>
            <Route path="/Inventory" >
              <Inventory apiMakes={apiMakes} valueKey={valueKey} valueData={valueData} getMarketValue={this.getMarketValue} inventory={this.props.inventoryData} />
            </Route>
            <Route path="/UserInventory" >
              <UserInventory apiMakes={apiMakes} inventory={this.props.inventoryData}/>
            </Route>
            <Route path="/Customers">
              <Customers users={this.props.userData}/>
            </Route>
            <Route path="/CarRules">
              <CarRules rules={this.props.rulesData}/>
            </Route>
            <Route path="/ContactUs">
              <ContactUs addMessage={this.props.addMessage}/>
            </Route>
            <Route path="/Messages">
              <Messages messages={this.props.messageData}/>
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
    inventoryData: state.inventory.inventoryData,
    rulesData: state.rules.rulesData,
    messageData: state.message.messageData
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUsers: input => dispatch(setUsers(input)),
    setInventory: input => dispatch(setInventory(input)),
    setRules: input => dispatch(setRules(input)),
    setMessages: input => dispatch(setMessages(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);