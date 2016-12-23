import React from 'react';
import ReactDOM from 'react-dom';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import App from './App';
import './index.css';

window.Hue = require("node-hue-api");

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

