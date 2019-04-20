import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Happiness from './Happiness'
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
        <Happiness startDate={this.state.startDate} />
        <Hunger startDate={this.state.startDate} />
      </div>
    );
  }
}

export default App;
