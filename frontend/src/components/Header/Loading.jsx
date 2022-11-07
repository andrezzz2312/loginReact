import React from 'react'
import './Loading.css'

const Loading = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: 'max-content',
			}}
		>
			<div class='loader'></div>
		</div>
	)
}

export default Loading
