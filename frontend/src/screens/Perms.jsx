import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Main from './Main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Card,
	CardContent,
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
	Typography,
} from '@mui/material'

const Perms = () => {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	})
	// const dispatch = useDispatch()
	// const permList = useSelector((state) => state.permList)
	// const { loading, perms, error } = permList

	// const deleteHandler = (id) => {
	// 	if (window.confirm('Are you sure?')) {
	// 	}
	// }
	// useEffect(() => {
	// 	dispatch(permList())
	// }, [])
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
		}
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			<Container maxWidth='xl' sx={{ paddingTop: 1 }}>
				<Card sx={{ boxShadow: 3 }} columns={{ sx: 12 }}>
					<CardContent>
						<Typography gutterBottom>Permisos</Typography>
						<Link to='createnote'>
							<button className='normalButton'>Create new note</button>
						</Link>
					</CardContent>
				</Card>
			</Container>
			{/* {notes.map((note) => (
						<div className='card'>
							<div class='cardTitle'>{note.title}</div>
							<div className='buttonGroup'>
								<Link to={`/perm/${note.id}`}>
									<button className='normalButton'>Edit</button>
								</Link>

								<button className='normalButton' onClick={() => deleteHandler}>
									Delete
								</button>
							</div>
						</div>
					))} */}
		</ThemeProvider>
	)
}

export default Perms
