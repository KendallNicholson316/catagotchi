import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Hunger from './Hunger'

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
        <Hunger startDate={this.state.startDate} />
      </div>
    );
  }
}

export default App;
