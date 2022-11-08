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
	const [image, setImage] = useState('Upload Profile Picture')
	const [email, setEmail] = useState('')
	const [position, setPosition] = useState('')
	const [idCard, setidCard] = useState('')
	const [name, setName] = useState('')
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
	const dispatch = useDispatch()
	const userRegister = useSelector((state) => state.userRegister)

	const { loading, error, userInfo } = userRegister

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

	const submitHandler = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage('Password do not match')
		} else {
			setUserCheck(true)
			dispatch(register(name, email, password, role, pic, position, idCard))
		}
	}

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage('Please Select an Image')
		}

		setPicMessage(null)
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData()
			data.append('file', pics)
			data.append('upload_preset', 'wiretracker')
			data.append('cloud_name', 'wireframeguayaquil')
			fetch('https://api.cloudinary.com/v1_1/wireframeguayaquil/image/upload', {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString())
				})
				.catch((err) => {})
		} else {
			return setPicMessage('Please Select an Image')
		}
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
											value={name}
											onChange={(e) => {
												setTemporal(false)
												setName(e.target.value)
											}}
											type='text'
										/>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Email'
											variant='outlined'
											value={email}
											onChange={(e) => {
												setTemporal(false)
												setEmail(e.target.value)
											}}
											type='email'
										/>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Posicion'
											variant='outlined'
											value={position}
											onChange={(e) => {
												setTemporal(false)
												setPosition(e.target.value)
											}}
											type='text'
										/>
										<TextField
											sx={{ m: 1 }}
											error={error && temporal ? true : false}
											autoFocus
											required
											label='Cedula'
											variant='outlined'
											value={idCard}
											inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
											onChange={(e) => {
												setTemporal(false)
												setidCard(e.target.value)
											}}
											type='number'
										/>
										<TextField
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
										/>
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
										<FormLabel id='demo-radio-buttons-group-label' sx={{}}>
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
										</Grid>
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
