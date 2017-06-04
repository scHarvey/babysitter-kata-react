import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import BabysitterBooking from './components/BabysitterBooking';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the BabySitter Booking Calculator</h2>
        </div>
        <p className="App-intro">
          
        </p>
        <BabysitterBooking />
      </div>
    );
  }
}

export default App;
