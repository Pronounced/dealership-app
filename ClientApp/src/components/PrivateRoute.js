import React, { Component } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

export class PrivateRoute extends Component {
    constructor(props){
        super(props);
    }
    render(){
    console.log("rest", this.props.rest)
    return (
        <Redirect
        path={this.props.to}
            
        /> 
    );
  }
}  