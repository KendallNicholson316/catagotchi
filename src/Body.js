import React from 'react'

import catmoving from './catmoving.gif'

const Body = (props) => {
  return (
    <div className="Body" style={styles.body}>
      <img src={catmoving} alt="cat moving" />
    </div>
  )
}

const styles = {
  canvas: {
    width: '100%',
    height: '100%',
  },

}

export default Body
