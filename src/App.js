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
      newUser: false,
      dead: false,
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
    let newUser = this.state.newUser

    if(typeof users[user.uid] === 'undefined') {
      newUser = true
    }

    users[user.uid] = user

    this.setState({ users, newUser })
  }

  handleUnauth() {
    this.setState({ user: {}, displayName: null, })
    localStorage.removeItem('user')
  }

  componentWillUnmount() {
    base.removeBinding(this.usersRef)
  }

  signOut = () => {
    if(this.state.dead === true) {
      this.setState({ dead: false })
    }

    auth.signOut().then(() => {
    }).catch(function(error) {
      //Sign-out unsuccessful.
    });
  }

  isSignedIn = () => {
    return this.state.user.uid
  }

  kill = () => {
    this.setState({ user: {}})
    localStorage.removeItem('lastFed')
    localStorage.removeItem('lastHappy')
    localStorage.removeItem('startDate')
    localStorage.removeItem('sick')

    const dead = true
    this.setState({ dead })
  }

  render() {
    let element
    let signOut

    if(this.state.dead) {
      element = <h2>DEAD</h2>
        signOut = <button onClick={this.signOut} >SIGN OUT </button>
    }

    else if(this.isSignedIn()) {
      element = <Game kill={this.kill} signOut={this.signOut} uid={this.state.user.uid} newUser={this.state.newUser} />
    }

    else {
      element = <SignIn />
    }

      return (
        <div className="App">
          {element}          
          {signOut}
        </div>
      );
  }
}

export default App;
