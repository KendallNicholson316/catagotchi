import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import base from './base'

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

    let sick = JSON.parse(localStorage.getItem('sick'))

    this.state = {
      startDate: startDate,
      usersSickness: {},
      sick: sick || false,
    }
  }

  toggleSick = () => {
    const sick = !this.state.sick

    localStorage.setItem('sick', JSON.stringify(sick))
    this.setState({ sick })
  }

  render() {
    let element = this.state.sick ? <button style={styles.heal} onClick={this.toggleSick}>➕ heal</button> : <span></span>
      
      return (
      <div className="Game" style={styles.game}>
        <Header startDate={this.state.startDate} sick={this.state.sick} newUser={this.props.newUser} sickoMode={this.toggleSick} uid={this.props.uid} />
        <Body />
				<div style={styles.tools}>
        	<button style={styles.signout} onClick={this.props.signOut}>🚪 Sign out</button>
        	{element}
        	<ReactPlayer height="0" width="0" playing={this.state.sick} url="https://www.youtube.com/watch?v=Nhsb4MXunMo" /> 
				</div>
      </div>
      )
  }
}

const styles = {
	game: {
		height: '50vh',	
	},

	tools: {
		height: '10vh',
		display: 'inline-block'
	},

	signout: {
		float: 'left',
    backgroundColor: '#fbedff',
    borderColor: '#e6ccff',
		marginRight: '50vh',
		borderRadius: '30%',
		fontSize: '1.75vh',
		height: '4vh',
		display: 'inline-block',
	},

	heal: {
		float: 'left',
		backgroundColor: '#e5ffeb',
		borderColor: '#beffba',
    borderRadius: '30%',
    fontSize: '1.75vh',
    height: '4vh',
		display: 'inline-block',
	},
}

export default Game
