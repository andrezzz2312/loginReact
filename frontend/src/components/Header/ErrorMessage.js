import React from 'react'

const ErrorMessage = ({ color = 'white', fontColor = 'black', children }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 'fit-content',
				height: 'min-content',
				backgroundColor: color,
				padding: '0.5rem',
				borderRadius: '.5rem',

				color: fontColor,
			}}
		>
			<strong> {children}</strong>
		</div>
	)
}

export default ErrorMessage
