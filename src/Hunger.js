import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

class Hunger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullness: 6,
      count: 1,
      lastFed: this.props.startDate
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.decreaseFullness, 1)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  feedMeal = () => {
    const fullness = 6
    if(this.props.fullness > 3) {
      this.props.sickoMode()
    }

    const lastFed = new Date()
		const count = 1
    this.setState({ fullness, lastFed, count })
  }

  decreaseFullness = () => {
    if(((new Date() - this.state.lastFed) / (60 * 1000)) >= this.state.count) {
      const count = this.state.count + 1
			let fullness = 0
			if(this.state.fullness > 0) {
      	fullness = this.state.fullness - 1
			}
      if(fullness === 0) {
      }

      this.setState({ fullness, count })
    }
  }

  feedSnack = () => {
    const fullness = 3

    if(this.state.fullness === 6) {
      this.props.sickoMode()
    }

    const lastFed = new Date()
		const count = 1
    this.setState({ fullness, lastFed, count })
  }

  render() {
    return (
      <div className="Hunger">
        <div>
          <ProgressBar percentage={(this.state.fullness/6) * 100} />
        </div>
        <button className="MealButton" onClick={this.feedMeal}>
          <span role="img" aria-label="plate">🍽</span>
        </button>

        <button className="SnackButton" onClick={this.feedSnack}>
          <span role="img" aria-label="fish">🐟</span>
        </button>
      </div>
    )
  }
}

export default Hunger
