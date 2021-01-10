import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import firebase from "./firebase";
import App from './App';


console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

