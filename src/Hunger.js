import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

import base from './base'

class Hunger extends Component {
  constructor(props) {
    super(props)
    let lastFed = Date.parse(JSON.parse(localStorage.getItem('lastFed')))
    console.log("after parse "+ lastFed +" | "+ localStorage.getItem('lastFed'))
    if(isNaN(lastFed)) {
      lastFed = this.props.startDate

      localStorage.setItem('lastFed', JSON.stringify(lastFed))
    }


//		const lastFed = Date.parse(JSON.parse(localStorage.getItem('lastFed')))
    this.state = {
      fullness: 6,
			usersFullness: {},
      count: 1,
      lastFed: lastFed,
			newUser: false,
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

		//console.log(this.state.fullness)
//    this.fullnessRef = base.syncState(`users/${this.props.uid}/fullness`, {
//      context: this,
//      state: 'fullness',
//    })


/*		console.log(this.state.lastFed)
		const butt = this.state.lastFed.getTime()
		this.setState({ butt })
		if(this.lastFedRef) {
			base.removeBinding(this.lastFedRef)
		}
		
    this.buttRef = base.syncState(`users/${this.props.uid}/butt`, {
      context: this,
			asArray: false,
      state: 'butt',
    })
		    console.log(this.state.lastFed)

    if(this.props.newUser === false) {
			console.log("state "+this.state.lastFed)
      const hoursPassed = new Date() - this.state.lastFed
			console.log("hours "+hoursPassed)
      const reduceFullnessBy = Math.floor(hoursPassed / (1000 * 60))
			console.log("reduce "+reduceFullnessBy)
      const fullness =  this.state.fullness - reduceFullnessBy
     	console.log("calc full "+fullness) 
      this.setState({ fullness })
    }
*/
  }

  componentWillUnmount() {
    clearInterval(this.interval)

    base.removeBinding(this.usersFullnessRef)
    base.removeBinding(this.lastFedRef)
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
      this.props.sickoMode()
    }
  }

  decreaseFullness = () => {
    if(this.state.newUser === false) {
      console.log("this is a old user!")
			//console.log("state "+this.state.lastFed)
      const hoursPassed = new Date() - this.state.lastFed
      //console.log("hours "+hoursPassed)
      const reduceFullnessBy = Math.floor(hoursPassed / (1000 * 60))
      //console.log("reduce "+reduceFullnessBy)
      const fullness =  this.state.fullness - reduceFullnessBy
			
			const usersFullness = {...this.state.usersFullness}
			usersFullness[this.props.uid] = fullness			
      //console.log("calc full "+fullness) 
      this.setState({ fullness, usersFullness })
    }

		else {
		console.log("this is an new user!")
    if(((new Date() - this.state.lastFed) / (60 * 1000)) >= this.state.count) {
      const count = this.state.count + 1
      let fullness = 0

      if(this.state.fullness > 0) {
        fullness = this.state.fullness - 1
      }

			console.log("yote "+fullness)

			const usersFullness = {...this.state.usersFullness}
			usersFullness[this.props.uid] = fullness

      //console.log(fullness)
      this.setState({ count, fullness, usersFullness })
//	    localStorage.setItem('lastFed', JSON.stringify(this.state.lastFed))

      if(fullness === 0) {
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
