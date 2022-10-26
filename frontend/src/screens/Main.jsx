import {
	Container,
	createTheme,
	CssBaseline,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	ThemeProvider,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { lightBlue } from '@mui/material/colors'

import Box from '@mui/material/Box'
function Main() {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	})
	const color = lightBlue[500]
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	console.log(userInfo)
	const logoutHandler = () => {
		dispatch(logout())
		navigate('/')
	}
	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo')
		if (!userInfo) {
			navigate('/')
		}
	}, [navigate])
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Grid container>
				<Grid item xs={2}>
					<List component='nav' aria-label='mailbox folders'>
						<ListItem button component={Link} to='/perms'>
							<ListItemText primary='Permisos de horas extras' />
						</ListItem>

						<Divider />
						{userInfo.isAdmin ? (
							<ListItem button component={Link} to='/register' divider>
								<ListItemText primary='Nuevo usuario' />
							</ListItem>
						) : (
							''
						)}

						<ListItem button onClick={logoutHandler}>
							<ListItemText primary='Salir' />
						</ListItem>
					</List>
				</Grid>
				<Grid
					item
					height='100vh'
					display='flex'
					flexDirection='column'
					xs={10}
					sx={{ bgcolor: 'primary.main' }}
				>
					<Box flex={1}></Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default Main
