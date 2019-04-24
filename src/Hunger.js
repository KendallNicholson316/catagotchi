import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

import base from './base'

class Hunger extends Component {
  constructor(props) {
    super(props)

    let lastFed = Date.parse(JSON.parse(localStorage.getItem('lastFed')))

    if(isNaN(lastFed)) {
      lastFed = this.props.startDate

      localStorage.setItem('lastFed', JSON.stringify(lastFed))
    }

    this.state = {
      fullness: 6,
      usersFullness: {},
      count: 1,
      lastFed: lastFed,
      newUser: false,
      sick: this.props.sick,
    }
  }

  componentDidMount() {
    this.usersFullnessRef = base.syncState('usersFullness', {
      context: this,
      state: 'usersFullness',
    })

    if(typeof this.state.usersFullness[this.props.uid] === 'undefined') {
      const newUser = true
      const usersFullness= {...this.state.usersFullness}
      usersFullness[this.props.uid] = 6
      this.setState({ newUser, usersFullness })
    }

    else {
      const fullness = this.state.userFullness[this.props.uid]
      this.setState({ fullness })
    }

    this.interval = setInterval(this.decreaseFullness, 1)
  }

  componentWillUnmount() {
    clearInterval(this.interval)

    base.removeBinding(this.usersFullnessRef)
  }

  feedMeal = () => {
    const fullness = 6
    const originalFullness = this.state.fullness

    const lastFed = new Date()
    const count = 1

    const usersFullness = {...this.state.usersFullness}
    usersFullness[this.props.uid] = fullness

    this.setState({ fullness, usersFullness, lastFed, count })

    localStorage.setItem('lastFed', JSON.stringify(lastFed)) 

    if(originalFullness > 3) {
      const sick = true
      this.setState({ sick })
      this.props.sickoMode()
    }
  }

  decreaseFullness = () => {
    if(this.state.newUser === false) {
      const hoursPassed = new Date() - this.state.lastFed
      const reduceFullnessBy = Math.floor(hoursPassed / (1000))
      const fullness =  this.state.fullness - reduceFullnessBy

      const usersFullness = {...this.state.usersFullness}
      usersFullness[this.props.uid] = fullness			
      this.setState({ fullness, usersFullness })
    }

    else {
      if(((new Date() - this.state.lastFed) / (1000)) >= this.state.count) {
        const count = this.state.count + 1
        let fullness = 0

        if(this.state.fullness > 0) {
          fullness = this.state.fullness - 1
        }

        const usersFullness = {...this.state.usersFullness}
        usersFullness[this.props.uid] = fullness

        this.setState({ count, fullness, usersFullness })

        if(fullness === 0) {
          this.props.kill()
        }
      }
    }
  }

  feedSnack = () => {
    let fullness = 6
    const originalFullness = this.state.fullness

    if(this.state.fullness < 3) {
      fullness = this.state.fullness + 3		
    }

    else if(this.state.fullness >= 3 && this.state.fullness <= 5) {
      fullness = 6
    } 

    const lastFed = new Date()
    const count = 1

    const usersFullness = {...this.state.usersFullness}
    usersFullness[this.props.uid] = fullness

    this.setState({ usersFullness, fullness, count, lastFed })
    localStorage.setItem('lastFed', JSON.stringify(lastFed))

    if(originalFullness === 6) {
      this.props.sickoMode()
    }
  }

  render() {
    return (
      <div className="Hunger">
        <div>
          <ProgressBar percentage={(this.state.fullness/6) * 100} />
        </div>
        <button className="MealButton" disabled={this.props.sick} style={styles.meal} onClick={this.feedMeal}>
          <span role="img" aria-label="plate">🍽</span>
        </button>

        <button className="SnackButton" disabled={this.props.sick} style={styles.snack} onClick={this.feedSnack}>
          <span role="img" aria-label="fish">🐟</span>
        </button>
      </div>
    )
  }
}

const styles = {
  snack: {
    float: 'left',
    background: '#ffeffb',
    width: '12%',
    border: '2px solid #ffcef5',
    fontSize: '3vh',
    marginTop: '2%',
    marginLeft: '20%',
    borderRadius: '50%',
  },

  meal: {
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


export default Hunger
