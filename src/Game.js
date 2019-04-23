import React from 'react'

import Header from './Header'
import Body from './Body'

const Game = (props) => {
  return (
    <div className="Game">
      <Header startDate={props.startDate} uid={props.uid}/>
      <Body />
      <button onClick={props.signOut}>➘</button>
   	</div>
  )


}

const styles = {
	canvas: {
		width: '100%',
		height: '100%',
	},

}


export default Game
