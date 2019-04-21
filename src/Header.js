import React from 'react'

import Hunger from './Hunger'
import Happiness from './Happiness'

const Header = (props) => {
  return (
    <div className="Header" style={styles.header}>
			<div style={styles.happy}>
      	<Happiness startDate={props.startDate}/>
      </div>
			<div style={styles.hungry}>
				<Hunger startDate={props.startDate}/>
			</div>
			<div className="clear" style={styles.clear}>
			</div>
    </div>
  )
}

const styles = {
	header: {
		height: '30%',
	},

  happy: {
    float: 'left',
		height: '30%',
		marginLeft: '100px',
		marginTop: '50px',
		marginBottom: '50px',
  },

	clear: {
		clear: 'both',
	},

  hungry: {
    float: 'right',
		height: '30%',
    marginRight: '100px',
    marginTop: '50px',
    marginBottom: '50px',
  }
}


export default Header
