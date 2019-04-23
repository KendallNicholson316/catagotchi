import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

import base from './base'

class Hunger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullness: 6,
      count: 1,
      lastFed: this.props.startDate,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.decreaseFullness, 1)

    this.fullnessRef = base.syncState(`users/${this.props.uid}/fullness`, {
      context: this,
      state: 'fullness',
    })

    this.lastFedRef = base.syncState(`users/${this.props.uid}/lastFed`, {
      context: this,
      state: 'lastFed',
    })

    if(this.props.newUser === false) {
      const hoursPassed = new Date() - this.state.lastFed
      const reduceFullnessBy = Math.floor(hoursPassed / (1000 * 60))

      const fullness =  this.state.fullness - 
        reduceFullnessBy
      
      this.setState({ fullness })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)

    base.removeBinding(this.fullnessRef)
    base.removeBinding(this.lastFedRef)
  }

  feedMeal = () => {
    const fullness = 6
    const originalFullness = this.state.fullness

    const lastFed = new Date()
    const count = 1

    this.setState({ fullness, lastFed, count })

    if(originalFullness > 3) {
      this.props.sickoMode()
    }
  }

  decreaseFullness = () => {
    if(((new Date() - this.state.lastFed) / (60 * 1000)) >= this.state.count) {
      const count = this.state.count + 1
      let fullness = 0

      if(this.state.fullness > 0) {
        fullness = this.state.fullness - 1
      }

      console.log(fullness)
      this.setState({ count, fullness })

      if(fullness === 0) {
      }
    }
  }

  feedSnack = () => {
    let fullness = 6
    const originalFullness = this.state.fullness

    if(this.state.fullness <= 3) {
      fullness = this.state.fullness + 3		
    }

    else if(this.state.fullness >= 3 && this.state.fullness <= 5) {
      fullness = 6
    } 

    const lastFed = new Date()
    const count = 1

    this.setState({ fullness, count, lastFed })

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
        <button className="MealButton" style={styles.meal} onClick={this.feedMeal}>
          <span role="img" aria-label="plate">🍽</span>
        </button>

        <button className="SnackButton" style={styles.snack} onClick={this.feedSnack}>
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
