import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import Loading from '../components/Header/Loading'
import ErrorMessage from '../components/Header/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import {
	Container,
	createTheme,
	CssBaseline,
	Grid,
	TextField,
	ThemeProvider,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

let scene, camera, renderer, cube, canvas, clock
let once = true
function init() {
	scene = new THREE.Scene()
	canvas = document.querySelector('.three')
	camera = new THREE.PerspectiveCamera(
		75,
		canvas.offsetWidth / canvas.offsetHeight,
		0.1,
		1000
	)
	clock = new THREE.Clock()
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

	canvas.appendChild(renderer.domElement)

	const geometry = new THREE.BoxGeometry(2, 2, 2)
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	cube = new THREE.Mesh(geometry, material)
	scene.add(cube)

	camera.position.z = 5
}

function animate() {
	requestAnimationFrame(animate)
	let clockTimer = clock.getDelta()
	cube.rotation.x += clockTimer * 1
	cube.rotation.y += clockTimer * 1

	renderer.render(scene, camera)
}
const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	useEffect(() => {
		if (userInfo) {
			navigate('/main')
		}
	}, [userInfo, navigate])

	function onWindowResize() {
		camera.aspect = canvas.offsetWidth / canvas.offsetHeight
		camera.updateProjectionMatrix()
		renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
	}
	window.addEventListener('resize', onWindowResize, false)

	const submitHandler = async (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	const fetchUsers = async () => {}

	useEffect(() => {
		// const userInfo = localStorage.getItem('userInfo')
		// if (userInfo) {
		// 	navigate('/main ')
		// }
	}, [navigate, userInfo])

	useEffect(() => {
		init()
		animate()
		fetchUsers()
	}, [])

	useEffect(() => {
		console.log(loading)
	}, [loading])

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	})
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<main>
				<Container
					columns={{ sm: 6 }}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Card sx={{ maxWidth: 300, boxShadow: 3 }}>
						<CardContent>
							<form action='' onSubmit={submitHandler}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											error={error}
											fullWidth
											label='Email'
											variant='outlined'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type='email'
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											error={error}
											fullWidth
											label='Contrasena'
											variant='outlined'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type='password'
										/>
									</Grid>
									<Grid item xs={12}>
										<LoadingButton
											loading={loading}
											loadingPosition='end'
											size='medium'
											variant='contained'
											type='submit'
											endIcon={<SendIcon />}
										>
											Login
										</LoadingButton>
									</Grid>
								</Grid>
							</form>
						</CardContent>
					</Card>

					{error && (
						<ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
							{error}
						</ErrorMessage>
					)}
				</Container>

				<Container className='right' sx={6}>
					<div className='three'></div>
				</Container>
			</main>
		</ThemeProvider>
	)
}

export default Login
