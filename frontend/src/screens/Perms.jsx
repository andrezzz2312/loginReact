import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
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

import { listPerms } from '../actions/permActions'
import Loading from '../components/Header/Loading.jsx'
import ErrorMessage from '../components/Header/ErrorMessage.jsx'

const Perms = () => {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	})

	const dispatch = useDispatch()
	const permList = useSelector((state) => state.permList)
	const { loading, perms, error } = permList

	// const deleteHandler = (id) => {
	// 	if (window.confirm('Are you sure?')) {
	// 	}
	// }
	useEffect(() => {
		dispatch(listPerms())
	}, [dispatch])

	if (perms) {
		var dates = []
		var apDates = []
		perms.forEach((e, i) => {
			var date = new Date(e.createdAt)
			var apDate = new Date(e.approvedDate)

			var fDate =
				date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
			if (apDate.getDate()) {
				var fApDate =
					apDate.getDate() +
					'/' +
					(apDate.getMonth() + 1) +
					'/' +
					apDate.getFullYear()

				apDates[i] = fApDate
			} else {
				apDates[i] = false
			}

			dates[i] = fDate
		})
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
								to='/createperm'
								variant='contained'
								color='success'
							>
								Create new note
							</Button>
						</CardActions>
						{error && <ErrorMessage>{error}</ErrorMessage>}
						{loading && <Loading />}
						{perms?.map((perm, index) => (
							<Grid key={perm._id}>
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
											<Typography sx={{ fontWeight: 'bold' }}>
												{perm.workerName + ' - ' + dates[index]}
											</Typography>
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
													EDIT
												</Button>
												<Button
													variant='contained'
													color='error'
													// onClick={() => deleteHandler(note._id)}
												>
													delete
												</Button>
											</CardActions>
										</Grid>
									</AccordionSummary>
									<AccordionDetails>
										<Grid>
											{/* <Chip
												label='test'
												// Category - {note.category}
												color='success'
												size='small'
												sx={{ mb: 2, mt: 1 }}
												className='chips'
											/> */}
											<Typography>
												Departamento: {perm.department}
												<br />
												Posicion: {perm.workerPosition}
												<br />
												Horario Laboral: {perm.workerWorkHours}
												<br />
												Horas extra requeridas:
												<br />
												{perm.requestedHours.map((e, index) => `\u2022 ` + e)}
												<br />
												Fecha de aprobacion:{' '}
												{apDates[index]
													? apDates[index]
													: 'No ha sido aprobado'}
												<br />
												Descripcion: {perm.description}
											</Typography>
										</Grid>
									</AccordionDetails>
								</Accordion>
							</Grid>
						))}
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
