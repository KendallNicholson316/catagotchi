import React, { Component } from 'react'

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
    this.setState({lastHappyDate, happiness})

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
			this.setState({lastHappyDate, happiness})

		}

	}

	updateBar = () => {
    //const timeElapsed = tihiivedncs.state.lastHappyDate.getTime()
    if(((new Date - this.state.lastHappyDate) / 60000) >= this.state.count) {
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
				<button className="pet" onClick={this.pet}><span role="img" aria-label="hand">✋</span></button>
  		  <button className="play" onClick={this.play}><span role="img" aria-label="yarn">🧶</span></button>
			</div>
		);
	}
}

export default Happiness
