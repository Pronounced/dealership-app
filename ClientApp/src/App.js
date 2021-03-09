import React, { Component } from 'react';
//import { Route } from 'react-router';
// import { Layout } from './components/Layout';
// import { Home } from './components/Home';
// import { FetchData } from './components/FetchData';
// import { Counter } from './components/Counter';
import { Inventory } from './components/Inventory';
import { AddInventory } from './components/AddInventory';
import Login  from './components/Login';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      view: "Login",
      inventory: []
    }
  }

  changeView = (option) => {
    this.setState({
      view: option,
    });
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

  renderView() {
    const { view } = this.state;
    if(view === "Login")
    {
      return(
        <Login changeView={this.changeView}/>
      )
    } 
    else if(view === "Inventory")
    {
      return (
        <Inventory inventory={this.state.inventory} changeView={this.changeView}></Inventory>
      )
    } 
    else if(view === "AddInventory") 
    {
      return (
        <AddInventory changeView={this.changeView}></AddInventory>
      )
    }
  }

  render() {
    // return (
    //   <div>
    //     <Route exact path='/' component={Inventory} />
    //     <Route path='/AddInventory' component={AddInventory} />
    //   </div>
    // )
    return this.renderView();
  }

/*   render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  } */
}
