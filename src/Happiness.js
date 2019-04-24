import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

import base from './base'

class Happiness extends Component{
  constructor(props) {
    super(props)

    let lastHappy = Date.parse(JSON.parse(localStorage.getItem('lastHappy')))

    if(isNaN(lastHappy)) {
      lastHappy = this.props.startDate
      localStorage.setItem('lastHappy', JSON.stringify(lastHappy))
    }

    this.state = {
      usersHappiness: {},
      lastHappy: lastHappy,
      happiness: 6,
      count: 1,
      newUser: false,
    }
  }

  componentDidMount() {
    this.usersHappinessRef = base.syncState('usersHappiness', {
      context: this,
      state: 'usersHappiness',
    })

    if(typeof this.state.usersHappiness[this.props.uid] === 'undefined') {
      const newUser = true
      const usersHappiness= {...this.state.usersHappiness}
      usersHappiness[this.props.uid] = 6
      this.setState({ newUser, usersHappiness })
    }

    else {
      const happiness = this.state.userHappiness[this.props.uid]
      this.setState({ happiness })
    }

    this.interval = setInterval(this.updateBar, 1)
  }

  componentWillUnmount() {
    clearInterval(this.interval);

    base.removeBinding(this.usersHappinessRef)
  }

  pet = () => {
    let happiness = this.state.happiness
    const lastHappy = new Date()

    if(this.state.happiness < 6) {
      happiness = this.state.happiness + 1;
    }

    const count = 1

    const usersHappiness = {...this.state.usersHappiness}
    usersHappiness[this.props.uid] = happiness

    this.setState({ lastHappy, happiness, count, usersHappiness })
    localStorage.setItem('lastHappy', JSON.stringify(lastHappy))
  }

  play = () => {
    let happiness = this.state.happiness
    var rand = Math.random()

    if(rand > .5) {
      const lastHappy = new Date()

      if(this.state.happiness < 6) {
        if(this.state.happiness < 3) {
          happiness = this.state.happiness + 3
        }		

        else {
          happiness = 6
        }
      }

      const count = 1

      const usersHappiness = {...this.state.usersHappiness}
      usersHappiness[this.props.uid] = happiness

      this.setState({ lastHappy, happiness, count, usersHappiness })
      localStorage.setItem('lastHappy', JSON.stringify(lastHappy))
    }
  }

  updateBar = () => {
    if(this.state.newUser === false) {
      const hoursPassed = new Date() - this.state.lastHappy
      const reduceHappinessBy = Math.floor(hoursPassed / (1000 * 60))
      const happiness =  this.state.happiness - reduceHappinessBy

      const usersHappiness = {...this.state.usersHappiness}
      usersHappiness[this.props.uid] = happiness
      this.setState({ happiness, usersHappiness })
    }

    else {
      if(((new Date() - this.state.lastHappy) / (60 * 1000)) >= this.state.count) {
        const count = this.state.count + 1
        let happiness = 0

        if(this.state.happiness > 0) {
          happiness = this.state.happiness - 1
        }

        const usersHappiness = {...this.state.usersHappiness}
        usersHappiness[this.props.uid] = happiness

        this.setState({ count, happiness, usersHappiness })

        if(happiness === 0) {
        }
      }
    }
  }

  render() {
    return ( 
      <div className="Happiness">
        <div>
          <ProgressBar percentage={(this.state.happiness/6) * 100} />
        </div>
        <div style={styles.buttons}>
          <button className="pet" style={styles.pet} onClick={this.pet}><span role="img" aria-label="hand">✋</span></button>
          <button className="play" style={styles.play} onClick={this.play}><span role="img" aria-label="yarn">🐁</span></button>
        </div>
      </div>
    );
  }
}

const styles = {
  pet: {
    float: 'left',
    background: '#ffeffb',
    width: '12%',
    border: '2px solid #ffcef5',
    fontSize: '3vh',
    marginTop: '2%',
    marginLeft: '20%',
    borderRadius: '50%',
  },

  play: {
    float: 'right',
    background: '#ffeffb',
    width: '12%',
    border: '2px solid #ffcef5',
    fontSize: '3vh',
    marginTop: '2%',
    marginRight: '20%',
    borderRadius: '50%',
  },
}

export default Happiness
