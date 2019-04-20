import React from 'react'

import Hunger from './Hunger'
import Happiness from './Happiness'

const Header = (props) => {
  return (
    <div className="Header">
      <Happiness startDate={props.startDate}/>
      <Hunger startDate={props.startDate}/>
    </div>
  )
}

export default Header
