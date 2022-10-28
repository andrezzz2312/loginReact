import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const ErrorMessage = ({ color = 'white', fontColor = 'black', children }) => {
	return (
		// <div
		// 	style={{
		// 		display: 'flex',
		// 		justifyContent: 'center',
		// 		alignItems: 'center',
		// 		width: 'fit-content',
		// 		height: 'min-content',
		// 		backgroundColor: color,
		// 		padding: '0.5rem',
		// 		borderRadius: '.5rem',

		// 		color: fontColor,
		// 	}}
		// >
		// 	<strong> {children}</strong>
		// </div>
		<Snackbar
			open={true}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			// autoHideDuration={6000}
		>
			<Alert severity='error' sx={{ width: '100%' }}>
				{children}
			</Alert>
		</Snackbar>
	)
}

export default ErrorMessage
