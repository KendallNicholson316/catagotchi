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

  toggleSick = () => {
    const sick = !this.state.sick
    this.setState({ sick })
  }

  render() {
    let element = this.state.sick ? <button onClick={this.toggleSick}>heal</button> : <span></span>
    return (
      <div className="Game">
        <Header startDate={this.state.startDate} sick={this.state.sick} newUser={this.props.newUser} sickoMode={this.toggleSick} uid={this.props.uid} />
        <Body />
        <button onClick={this.props.signOut}>➘</button>
        {element}
      </div>
    )
  }
}

export default Game
