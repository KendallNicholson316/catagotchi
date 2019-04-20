import React, { Component } from 'react';
import './App.css';

import Header from './Header'
//import SignIn from './SignIn'
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
