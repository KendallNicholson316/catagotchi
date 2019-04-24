import React, { Component } from 'react'

import Header from './Header'
import Body from './Body'

class Game extends Component {
  constructor() {
    super()

    let startDate = Date.parse(JSON.parse(localStorage.getItem('startDate')))

    if(isNaN(startDate)) {
      startDate = new Date()
      localStorage.setItem('startDate', JSON.stringify(startDate))
    }

    this.state = {
      startDate: startDate,
      sick: false,
    }
  }

  sickoMode = () => {
    const sick = true
    this.setState({ sick })
  }

  render() {
    return (
      <div className="Game">
        <Header startDate={this.state.startDate} newUser={this.props.newUser} sickoMode={this.sickoMode} uid={this.props.uid} />
        <Body />
        <button onClick={this.props.signOut}>➘</button>
      </div>
    )
  }
}

export default Game
