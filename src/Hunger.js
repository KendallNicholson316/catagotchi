import React, { Component } from 'react'

class Hunger extends Component {
  constructor() {
    super()
    this.state = {
      fullness: 6,
      lastFed: this.props.startDate
    }
  }

  feedMeal = () => {
    const fullness = 6
    if(this.props.fullness > 3) {
      this.props.sickoMode()
    }

    const lastFed = new Date()
    this.setState({ fullness, lastFed })
  }

  decreaseFullness = () => {
    if(lastFed.getTime() % 3600000) {

      const fullness = this.state.fullness - 1

      if(fullness == 0) {
        this.props.ded()
      }

      this.setState({ fullness })
    }
  }

  feedSnack = () => {
    const fullness = 3

    if(this.state.fullness == 6) {
      this.props.sickoMode()
    }

    lastFed = new Date()
    this.setState({ fullness, lastFed })
  }

  render() {
    return (
      <div className="Hunger">
        <button className="MealButton" onClick={this.feedMeal}>
          🍽
        </button>

        <button className="SnackButton" onClick={this.feedSnack}>
          🐟
        </button>
      </div>
    )
  }
}
