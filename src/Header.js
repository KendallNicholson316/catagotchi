import React from 'react'

import Hunger from './Hunger'
import Happiness from './Happiness'

const Header = (props) => {
  return (
    <div className="Header">
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
  happy: {
    float: 'left',
		marginLeft: '100px',
		marginTop: '50px',
		marginBottom: '50px',
  },

	clear: {
		clear: 'both',
	},

  hungry: {
    float: 'right',
    marginRight: '100px',
    marginTop: '50px',
    marginBottom: '50px',
  }
}


export default Header
