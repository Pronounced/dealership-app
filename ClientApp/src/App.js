import React, { Component } from 'react';
//import { Route } from 'react-router';
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
      isLoggedIn: false
    }
  }

  // componentDidMount(){
  //   if(localStorage.length !== 0)
  //   {
  //     let isLoggedIn = localStorage.getItem('isLoggedIn');
  //     let view = localStorage.getItem('view');
  //     this.setState({
  //       isLoggedIn: isLoggedIn,
  //       view: view
  //     });
  //   }
  // }

  changeView = (view) => {
    //localStorage.setItem('view', view)
    this.setState({
      view: view,
    });
  }

  onLogChange = (input) => {
    //localStorage.setItem('isLoggedIn', input);
    this.setState({
      isLoggedIn: input,
    });
  }

  renderView() {
    const { view } = this.state;
    if(view === "Login") 
    {
      return(
        <Login isLoggedIn={this.state.isLoggedIn} changeView={this.changeView} onLogChange={this.onLogChange}/>
      )
    } 
    else if(view === "Inventory")
    {
      return (
        <Inventory view={this.state.view} changeView={this.changeView}></Inventory>
      )
    } 
    else if(view === "AddInventory") 
    {
      return (
        <AddInventory changeView={this.changeView}></AddInventory>
      )
    }
  }

  componentDidUpdate(prevProps, prevState){
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
