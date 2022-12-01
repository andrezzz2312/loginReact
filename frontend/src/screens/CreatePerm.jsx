import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import ErrorMessage from '../components/Header/ErrorMessage'
import Loading from '../components/Header/Loading'
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
	TextField,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	Snackbar,
	Alert,
} from '@mui/material'
import { cyan, teal, grey, white } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { createPermAction } from '../actions/permActions'

const CreatePerm = () => {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	})
	const navigate = useNavigate()
	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo')
		if (!userInfo) {
			navigate('/')
		}
	}, [navigate])

	const [workerWorkHours, setWorkerWorkHours] = useState('')
	const [requestedHours, setRequestedHours] = useState([])
	const [description, setDescription] = useState('')
	const [idCard, setidCard] = useState('')
	const [department, setDepartment] = useState('')
	const [pic, setPic] = useState(
		'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
	)
	const [password, setPassword] = useState('')
	const [temporal, setTemporal] = useState(true)
	const [open, setOpen] = useState(true)
	const [confirmPassword, setConfirmPassword] = useState('')
	const [role, setRole] = useState('')
	const [message, setMessage] = useState(null)
	const [picMessage, setPicMessage] = useState(null)
	const [userCheck, setUserCheck] = useState(false)
	const userRegister = useSelector((state) => state.userRegister)
	const dispatch = useDispatch()

	const permCreate = useSelector((state) => state.permCreate)

	const { loading, error, userInfo } = permCreate

	useEffect(() => {
		error && setTemporal(true)
	}, [error])

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}
	useEffect(() => {
		if (userInfo && !error && userCheck) {
			navigate('/main')
			setUserCheck(false)
		}
	}, [navigate, userInfo, error, userCheck])

	const resetHandler = () => {
		setDepartment('')
		setWorkerWorkHours('')
		setRequestedHours('')
		setDescription('')
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (!department || !workerWorkHours || !requestedHours || !description)
			return
		setRequestedHours()
		dispatch(
			createPermAction(department, workerWorkHours, requestedHours, description)
		)
		resetHandler()
		navigate('/main')
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Container maxWidth='xl' sx={{}}>
				<Card
					sx={{ boxShadow: 3, mt: 2 }}
					columns={{ sx: 12 }}
					rows={{ sx: 12 }}
				>
					<CardContent>
						<CardHeader
							title='Registro'
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

						<form onSubmit={submitHandler}>
							<FormControl>
								<Grid sx={{ display: 'flex', flexDirection: 'row' }}>
									<Grid sx={{ display: 'flex', flexDirection: 'column' }}>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Departamento'
											variant='outlined'
											value={department}
											onChange={(e) => {
												setTemporal(false)
												setDepartment(e.target.value)
											}}
											type='text'
										/>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Horario Laboral'
											variant='outlined'
											value={workerWorkHours}
											onChange={(e) => {
												setTemporal(false)
												setWorkerWorkHours(e.target.value)
											}}
											type='email'
										/>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Horas extra requeridas'
											variant='outlined'
											value={requestedHours}
											onChange={(e) => {
												setTemporal(false)
												// setRequestedHours(e.target.value)
											}}
											type='text'
										/>
										{/* <TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Description'
											variant='outlined'
											value={idCard}
											inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
											onChange={(e) => {
												setTemporal(false)
												setidCard(e.target.value)
											}}
											type='number'
										/> */}
										<textarea
											id='message'
											rows='4'
											className='block p-2.5 m-2  w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus: ring-blue-500 focus: border-gray-500 dark: bg-gray-700 dark: border-gray-600 dark: placeholder-gray-400 dark: text-white dark: focus:ring-blue-500 dark: focus:border-blue-500'
											placeholder='Descripcion'
											value={description}
											onChange={(e) => {
												setTemporal(false)
												setDescription(e.target.value)
											}}
										></textarea>

										{/* <TextField
											sx={{ m: 1 }}
											error={message && true}
											autoFocus
											required
											label='Contrasena'
											variant='outlined'
											value={password}
											onChange={(e) => {
												setMessage(false)
												setPassword(e.target.value)
											}}
											type='text'
										/>
										<TextField
											sx={{ m: 1 }}
											error={message && true}
											autoFocus
											required
											label='Confirmar Contrasena'
											variant='outlined'
											value={confirmPassword}
											onChange={(e) => {
												setMessage(false)
												setConfirmPassword(e.target.value)
											}}
											type='text'
										/> */}
										{message && <ErrorMessage>{message}</ErrorMessage>}
									</Grid>
									<Grid
										sx={{
											display: 'flex',
											flexDirection: 'column',
											p: 1,
											pl: 2,
										}}
									>
										{/* <FormLabel id='demo-radio-buttons-group-label' sx={{}}>
											Role:
										</FormLabel>
										<RadioGroup
											aria-labelledby='demo-radio-buttons-group-label'
											defaultValue='female'
											name='radio-buttons-group'
										>
											<FormControlLabel
												value='manager'
												control={<Radio required />}
												label='Manager'
												onClick={(e) => {
													setRole(e.target.value)
												}}
											/>
											<FormControlLabel
												value='worker'
												control={<Radio required />}
												label='Worker'
												onClick={(e) => {
													setRole(e.target.value)
												}}
											/>
										</RadioGroup>
										<Grid item sx={{ mt: 3 }}>
											<Button
												variant='contained'
												component='label'
												sx={{ minHeight: '55px' }}
											>
												Upload File
												<input
													type='file'
													id='inputFile'
													onChange={(e) => {
														postDetails(e.target.files[0])
														setImage(e.target.files[0].name)
													}}
													hidden
												/>
											</Button>
											<TextField
												variant='outlined'
												value={image}
												type='text'
												disabled
											/>

											{picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
										</Grid> */}
									</Grid>
								</Grid>
								<CardActions sx={{ marginBottom: 2 }}>
									<Button type='submit' color='success' variant='contained'>
										Registro
									</Button>
									{error && temporal ? (
										<ErrorMessage>{error}</ErrorMessage>
									) : (
										''
									)}
								</CardActions>
							</FormControl>
						</form>
					</CardContent>
				</Card>
			</Container>
		</ThemeProvider>
	)
}

export default CreatePerm
