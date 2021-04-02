import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
//const connection = `http://localhost:${process.env.REACT_APP_PORT}/`;
const connection = `http://localhost:3002/`;

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App connection={connection}/>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

