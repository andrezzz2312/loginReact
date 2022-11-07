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
	ThemeProvider,
	Typography,
	Chip,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
} from '@mui/material'
import { cyan, teal, grey, white } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
			<Container maxWidth='xl' sx={{ pt: 2 }}>
				<Card sx={{ boxShadow: 3 }} columns={{ sx: 12 }}>
					<CardContent>
						<CardHeader
							title='Permisos'
							action={
								<Button
									component={Link}
									to='/'
									variant='contained'
									sx={{
										backgroundColor: grey[700],
										color: '#fff',
										'&:hover': {
											backgroundColor: grey[800],
										},
									}}
								>
									Back
								</Button>
							}
						></CardHeader>

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
						{/* {notes.map((note) => ( */}
						<Grid>
							<Accordion
								sx={{
									backgroundColor: grey[800],
									'&:before': {
										display: 'none',
									},
								}}
							>
								<AccordionSummary
									aria-controls='panel1a-content'
									id='panel1a-header'
									sx={{
										backgroundColor: grey[700],
									}}
								>
									<Grid
										container
										sx={{
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignContent: 'space-between',
										}}
									>
										<Typography>Accordion 1</Typography>
										<CardActions>
											<Button
												// component={Link}
												sx={{
													backgroundColor: teal[500],
													color: '#fff',
													'&:hover': {
														backgroundColor: teal[800],
													},
												}}
												// to={`/note/${note._id}`}
												variant='contained'
											>
												EDIT NOTE
											</Button>
											<Button
												variant='contained'
												color='error'
												// onClick={() => deleteHandler(note._id)}
											>
												delete note
											</Button>
										</CardActions>
									</Grid>
								</AccordionSummary>
								<AccordionDetails>
									<Grid>
										<Chip
											label='test'
											color='success'
											size='small'
											sx={{ mb: 2, mt: 1 }}
											className='chips'
										/>
										<Typography>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Suspendisse malesuada lacus ex, sit amet blandit leo
											lobortis eget.
										</Typography>
									</Grid>
								</AccordionDetails>
							</Accordion>
						</Grid>

						{/* ))} */}
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
