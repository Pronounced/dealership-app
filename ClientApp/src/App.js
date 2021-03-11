import React, { Component } from 'react';
import { Inventory } from './components/Inventory';
import { AddInventory } from './components/AddInventory';
import { UserInventory } from './components/UserInventory';
import Login  from './components/Login';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'
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
    view: '/',
    currentUser: null
  }

  handleAdd = () => {
    this.setState({
      ...this.state,
      showForm: !this.state.showForm,
    });
  };

  changeView = (view) => {
    this.setState({
      ...this.state,
      view: view
    })
  }

  updateCar = (car,status) => {
    console.log(car)
    this.setState({
      inventoryData: this.state.inventoryData.map((item)=> {
        if (item.guid === car.guid){
          item.isApproved = status
        }
      })
    })
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

  updateLoginStatus = (status, isAdmin, user,) => {
    console.log("updateLoginStatus")
    this.setState({
      ...this.state,
      isLoggedIn: status,
      isAdmin: isAdmin,
      currentUser: user,
      view: 'Inventory'
    },
    
    );
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
    const { showForm, inventoryData, isLoggedIn, userData, isAdmin, view, currentUser } = this.state;
    return(
        <Router>
          <Redirect to={view}/>
          <Switch>
            <Route path="/Inventory" >
              <Inventory updateCar={this.updateCar} addCar={this.addCar} changeView={this.changeView} handleAdd={this.handleAdd} isAdmin={isAdmin} inventory={inventoryData} />
            </Route>
            <Route path="/UserInventory" >
              <UserInventory inventory={inventoryData} changeView={this.changeView} currentUser={currentUser} view={view} addCar={this.addCar}/>
            </Route>
            <Route path="/AddInventory" >
              <AddInventory currentUser={currentUser} addCar={this.addCar} />
            </Route>
            <Route path="/">
              <Login changeView={this.changeView} updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} login={isLoggedIn} users={userData} />
            </Route>
          </Switch>
        </Router>
    )
    // if(!isLoggedIn) {
    //   return (        
    //     <Login updateLoginStatus={this.updateLoginStatus} isAdmin={isAdmin} login={isLoggedIn} users={userData}/>     
    //   )
    // } else if (showForm)
    // {
    //   return(
    //     <div> 
    //       <AddInventory currentUser={currentUser} addCar={this.addCar} />
    //       <Button onClick={this.handleAdd}>{showForm ? "Cancel" : "Add"}</Button>
    //     </div>
    //   )
    // } else
    // {
    //   if(isAdmin)
    //   {
    //     return (<div>
    //       <Inventory changeView={this.changeView} handleAdd={this.handleAdd} isAdmin={isAdmin} inventory={inventoryData} />
    //       <Button onClick={this.handleAdd}>{showForm ? "Cancel" : "Add"}</Button>
    //     </div>)

    //   } else if (view === "UserInventory")
    //   {
    //     return(
    //       <div>
    //         <UserInventory inventory={inventoryData} changeView={this.changeView} currentUser={currentUser} view={view} addCar={this.addCar}/>
    //       </div>
    //     )
    //   } 
    //   else {
    //     return (
    //       <div>
    //         <Inventory changeView={this.changeView} handleAdd={this.handleAdd} isAdmin={isAdmin} inventory={inventoryData} />
    //       </div>
    //     )
    //   }
    // }
  }
}
