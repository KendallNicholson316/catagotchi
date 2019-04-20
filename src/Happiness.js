import React, { Component } from 'react'
import ProgressBar from './ProgressBar'

class Happiness extends Component{
	constructor(props) {
		super(props)
		this.state = {
			lastHappyDate: this.props.startDate,
			happiness: 6,
			count: 1,
		}
	}

	componentDidMount() {
  	this.interval = setInterval(this.updateBar, 1)
	}
	componentWillUnmount() {
  	clearInterval(this.interval);
	}

	pet = () => {
		let happiness = this.state.happiness
		const lastHappyDate = new Date()
		if(this.state.happiness < 6) {
			happiness = this.state.happiness + 1;
		}
		const count = 1
    this.setState({lastHappyDate, happiness, count})

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
			this.setState({lastHappyDate, happiness, count})

		}

	}

	updateBar = () => {
    //const timeElapsed = tihiivedncs.state.lastHappyDate.getTime()
    if(((new Date() - this.state.lastHappyDate) / 60000) >= this.state.count) {
			console.log("banana")
			if(this.state.happiness > 0) {
				const happiness = this.state.happiness - 1;
				this.setState({happiness})
			}
			const count = this.state.count + 1
			this.setState({count})
		}
	}

	render() {
		return ( 
			<div className="Happiness">
				<div>
					<ProgressBar percentage={(this.state.happiness/6) * 100} />
				</div>
				<div>
					<button className="pet" style={styles.pet} onClick={this.pet}><span role="img" aria-label="hand">✋</span></button>
  		  	<button className="play" style={styles.play} onClick={this.play}><span role="img" aria-label="yarn">🧶</span></button>
				</div>
			</div>
		);
	}
}

const styles = {
	pet: {
		float: 'left',
		marginTop: '5%',
		marginLeft: '20%',
		borderRadius: '50%',
	},
	
	play: {
		float: 'right',
		marginTop: '5%',
		marginRight: '20%',
		borderRadius: '50%',
	},
}

export default Happiness
