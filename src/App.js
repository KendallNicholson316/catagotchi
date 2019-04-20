import React, { Component } from 'react';
import './App.css';

import Header from './Header'
//import SignIn from './SignIn'

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
      </div>
    );
  }
}

export default App;
