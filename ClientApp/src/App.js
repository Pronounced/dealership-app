import React, { Component } from 'react';
import { Inventory } from './components/Inventory';
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
import { Messages } from './components/Messages';
import Registration from './components/Registration';
import { setUsers } from './features/userSlice';
import { connect } from 'react-redux';

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
        if(car.vin === vin)
        {
          car.isApproved = status;
        }
        return car
      })
    });
    this.putData(copyData.filter(car => car.vin === vin)[0], `${this.props.connection}putcar`);
  }

  addCar = (car) => {
    this.setState({
      inventoryData: this.state.inventoryData.concat(car),
      showForm: false,
      loading: true,
    });
    this.postData(car, `${this.props.connection}postcar`)
  };

  addCarRule = (rule) => {
    this.setState({
      carRules: this.state.carRules.concat(rule),
      loading: true,
    });
    this.postData(rule, `${this.props.connection}postrule`)
  };

  addMessage = (message) => {
    this.setState({
      messages: this.state.messages.concat(message),
      loading: true,
    });
    this.postData(message, `${this.props.connection}postmessage`)
  }

  addUser = (user) => {
    this.setState({
      userData: this.state.userData.concat(user),
      loading: true,
    });
    this.postData(user, `${this.props.connection}postuser`)
  };

  deleteCarRule = (rule) => {
    let copyData = this.state.carRules;
    var index = copyData.indexOf(rule);
    copyData.splice(index, 1);
    this.setState({
      carRules: copyData,
    })
    this.deleteData(rule, `${this.props.connection}deleterule`)
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
    console.log("Test Login");
    this.setState({
      ...this.state,
      isLoggedIn: status,
      isAdmin: isAdmin,
      currentUser: user,
    });
  }

  componentDidMount() {
    this.getData(`${this.props.connection}getcars`).then((data) => {
      this.setState({ ...this.state, inventoryData: data, loading: false });
    });
    this.getData(`${this.props.connection}getrules`).then((data) => {
      this.setState({ ...this.state, carRules: data, loading: false });
    });
    this.getData(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`).then((data) => {
      this.setState({...this.state, apiMakes: [data], loading: false });
    });
    this.getData(`${this.props.connection}getmessages`).then((data) => {
      this.setState({ ... this.state, messages: data, loading: false});
    })
    this.getData(`${this.props.connection}getusers`).then((data) => {
      this.props.setUsers(data);
    });
  }

  componentDidUpdate(prevProps, prevState) {

  }
  

  render() {
    const { messages, valueKey, inventoryData, userData, isAdmin, view, currentUser, carRules, isLoggedIn, valueData, apiMakes } = this.state;
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
              <Login updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} users={this.props.userData} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUsers: input => dispatch(setUsers(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);