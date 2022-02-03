import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './app';
import React from 'react';

ReactDOM.render(
  <BrowserRouter basename='/'>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);