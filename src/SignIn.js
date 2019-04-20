import React, { Component } from 'react'

import { auth, googleProvider } from './base'

class SignIn extends Component {
  authenticate = () => {
    auth.signInWithPopup(googleProvider)
  }

  render() {
    return (
      <div className="SignIn">
        <button type="button" onClick={this.authenticate}>
          Sign In With Google
        </button>
      </div>
    )
  }
}

export default SignIn
