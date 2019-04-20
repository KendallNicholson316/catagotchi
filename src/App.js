import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header'
import Body from './Body'

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
        <Header startDate={this.state.startDate} />
        <Body />
      </div>
    );
  }
}

export default App;
