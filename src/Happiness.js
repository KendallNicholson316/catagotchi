class Happiness {
	constructor() {
		super()
		this.state = {
			lastHappyDate: this.props.startDate,
			happiness = 6,
		}
	}

	pet = (button) => {
		this.state.lastPetDate = new Date()
		if(happiness < 6) {
			happiness++;
		}
	}

	play = (button) => {
		var rand = Math.random()
		if(rand > .5) {
    	this.state.lastHappyDate = new Date()
	    if(happiness < 6) {
				if(happiness < 3) {
					happiness += 3
				}		
				else {
					happiness = 6
				}
			}
		}

	}

	updateBar = () => {
    const timeElapsed = lastHappyDate.getTime()
    if(timeElapsed % 3600000 == 0) {
			happiness--
		}
	}

	render = () => {
		<div className="Happiness">
			<button className="pet" onClick={this.pet}>✋</button>
  	  <button className="play" onClick={this.play}>🧶</button>
		</div>
	}
}
