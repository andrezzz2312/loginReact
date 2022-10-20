import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Main from './Main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	createTheme,
	CssBaseline,
	Grid,
	IconButton,
	ThemeProvider,
	Typography,
	DialogActions,
} from '@mui/material'
import { cyan, teal, grey } from '@mui/material/colors'

const Perms = () => {
	const darkTheme = createTheme({
		palette: {
			editC: {
				main: teal[500],
				contrastText: '#fff',
				'&:hover': {
					backgroundColor: teal[800],
				},
			},

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
						<CardHeader title='Permisos'></CardHeader>
						<CardActions sx={{ marginBottom: 2 }}>
							<Button
								component={Link}
								to='/createnote'
								variant='contained'
								color='success'
							>
								Create new note
							</Button>
						</CardActions>

						<Card
							sx={{
								backgroundColor: grey[800],

								padding: 2,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									alignContent: 'center',
								}}
							>
								<Typography>Perm1</Typography>
								<Grid sx={{ display: 'flex', gap: 2 }}>
									<Button
										component={Link}
										sx={{
											backgroundColor: teal[500],
											color: '#fff',
											'&:hover': {
												backgroundColor: teal[800],
											},
										}}
										to='/createnote'
										variant='contained'
									>
										EDIT NOTE
									</Button>
									<Button
										component={Link}
										to='/createnote'
										variant='contained'
										color='error'
									>
										delete note
									</Button>
								</Grid>
							</Box>
						</Card>
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
