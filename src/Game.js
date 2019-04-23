import React from 'react'

import Header from './Header'
import Body from './Body'

const Game = (props) => {
  return (
    <div className="Game">
      <Header startDate={props.startDate} newUser={props.newUser} uid={props.uid} />
      <Body />
      <button onClick={props.signOut}>➘</button>
    </div>
  )
}

export default Game
