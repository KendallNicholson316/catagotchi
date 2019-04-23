import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

import base from './base'

class Happiness extends Component{
  constructor(props) {
    super(props)
    this.state = {
      usersHappiness: {},
      lastHappyDate: this.props.startDate,
      happiness: 6,
      count: 1,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.updateBar, 1)
    
    this.usersHappinessRef = base.syncState('usersHappiness', {
      context: this,
      state: 'usersHappiness',
    })
		console.log(this.props.uid + "\n" + this.state.usersHappiness)

    if(typeof this.state.usersHappiness[this.props.uid] === 'undefined') {
      const usersHappiness= {...this.state.usersHappiness}
      usersHappiness[this.props.uid] = 6
      this.setState({ usersHappiness })
    }

    else {
      const happiness = this.state.userHappiness[this.props.uid]
      this.setState({ happiness })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  
    base.removeBinding(this.usersHappinessRef)
  }

  pet = () => {
    let happiness = this.state.happiness
    const lastHappyDate = new Date()

    if(this.state.happiness < 6) {
      happiness = this.state.happiness + 1;
    }

    const count = 1
    
    const usersHappiness = {...this.state.usersHappiness}
    usersHappiness[this.props.uid] = happiness

    this.setState({ lastHappyDate, happiness, count, usersHappiness })

  }

  play = () => {
    let happiness = this.state.happiness
    var rand = Math.random()

    if(rand > .5) {
      const lastHappyDate = new Date()
      
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

      this.setState({ lastHappyDate, happiness, count, usersHappiness })

    }

  }

  updateBar = () => {
    if(((new Date() - this.state.lastHappyDate) / 60000) >= this.state.count) {

      if(this.state.happiness > 0) {
        const happiness = this.state.happiness - 1;
        const usersHappiness = {...this.state.usersHappiness}

        usersHappiness[this.props.uid] = happiness

        this.setState({ happiness, usersHappiness })
      }

      const count = this.state.count + 1


      this.setState({ count })
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
		display: 'block',
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
		display: 'block',
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
