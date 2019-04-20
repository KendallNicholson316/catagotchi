import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header'
import SignIn from './SignIn'

class App extends Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date()
    }
  }

  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default App;
