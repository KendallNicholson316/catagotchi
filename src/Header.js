import React from 'react'

import Hunger from './Hunger'
import Happiness from './Happiness'

const Header = (props) => {
  return (
    <div className="Header" style={styles.header}>
      <div style={styles.happy}>
        <Happiness newUser={props.newUser} startDate={props.startDate} uid={props.uid} />
      </div>
      <div style={styles.hungry}>
        <Hunger sickoMode={props.sickoMode} newUser={props.newUser} startDate={props.startDate} sick={props.sick} uid={props.uid} />
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
