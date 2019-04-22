import React, { Component } from 'react';
import './App.css';

import base, { auth } from './base'

import SignIn from './SignIn'
import Game from './Game'

class App extends Component {
  constructor() {
    super()
    const user = JSON.parse(localStorage.getItem('user'))
    this.state = {
      user: user || {},
      users: {},
      startDate: new Date()
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(
      user => {
        if(user) {
          this.handleAuth(user)
        } else {
          //user is signed out
          this.handleUnauth()
        }
      }
    )
  
    this.usersRef = base.syncState('users', {
      context: this,
      state: 'users',
    })
  }

  handleAuth(oAuthUser) {
    const user = {
      uid: oAuthUser.uid,
      displayName: oAuthUser.displayName,
      email: oAuthUser.email,
    }

    this.syncUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  syncUser = (user) => {
    if(this.state.displayName) {
      user.displayName = this.state.displayName
    }

    this.setState({ user }, () => this.syncUsers(user))
  }

  syncUsers = (user) => {
    const users = {...this.state.users}
    users[user.uid] = user

    this.setState({ users })
  }

  handleUnauth() {
    this.setState({ user: {}, displayName: null, })
    localStorage.removeItem('user')
  }

  componentWillUnmount() {
    base.removeBinding(this.usersRef)
  }

  signOut = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
    }).catch(function(error) {
      //Sign-out unsuccessful.
    });
  }

  isSignedIn = () => {
    return this.state.user.uid
  }

  render() {
    let element = this.isSignedIn() ? <Game signOut={this.signOut} startDate={this.state.startDate} uid={this.state.user.uid} /> : <SignIn />
    return (
      <div className="App">
        {element}
      </div>
    );
  }
}

export default App;
