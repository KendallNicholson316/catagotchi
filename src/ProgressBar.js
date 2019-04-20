import React from 'react'
const ProgressBar = (props) => {
	return (
		<div className="progress-bar" style={styles.progressBar}>
			<Filler percentage={props.percentage}/>
		</div>
	)
}

const Filler = (props) => {
	return <div className="filler" style={{...styles.filler,...{ width: `${props.percentage}%`} }} />
}

const styles = {
	progressBar: {
  	position: 'relative',
  	height: '20px',
  	width: '350px',
  	borderRadius: '50px',
  	border: '1px solid #333',
	},

	filler: {
  	background: '#1DA598',
  	height: '100%',
  	borderRadius: 'inherit',
  	transition: 'width .2s ease-in',
	}
}


export default ProgressBar
