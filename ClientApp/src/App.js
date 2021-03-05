import React, { Component } from 'react';
/* import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter'; */
import { Inventory } from './components/Inventory';
import { AddInventory } from './components/AddInventory';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      view: "Inventory"
    }
  }

changeView = (option) => {
  this.setState({
    view: option,
  });
}

  render() {
    if(this.state.view === "Inventory")
    {
      return (
        <Inventory view={this.changeView}></Inventory>
      )
    } else {
      return (
        <AddInventory view={this.changeView}></AddInventory>
      )
    }
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
