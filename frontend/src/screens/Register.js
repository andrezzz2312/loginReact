import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import ErrorMessage from '../components/Header/ErrorMessage'
import Loading from '../components/Header/Loading'

const Register = () => {
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
	const [confirmPassword, setConfirmPassword] = useState('')
	const [role, setRole] = useState('')
	const [message, setMessage] = useState(null)
	const [picMessage, setPicMessage] = useState(null)
	const [userCheck, setUserCheck] = useState(false)
	const dispatch = useDispatch()
	const userRegister = useSelector((state) => state.userRegister)

	const { loading, error, userInfo } = userRegister

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
					console.log(data)
					setPic(data.url.toString())
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			console.log(pics.type)
			return setPicMessage('Please Select an Image')
		}
	}
	return (
		<main>
			<div className='modalHours'>
				<div className='title'>Registro</div>
				<form
					onSubmit={submitHandler}
					className='content row'
					style={{ gap: '1rem' }}
				>
					<div
						className='col'
						style={{
							width: '50%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Name:</label>
							<input
								type='text'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Email:</label>
							<input
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Posicion:</label>
							<input
								type='text'
								placeholder='Ingresar Posicion'
								value={position}
								onChange={(e) => setPosition(e.target.value)}
								required
							/>
						</div>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Cedula:</label>
							<input
								type='text'
								placeholder='Ingresar Cedula'
								value={idCard}
								onChange={(e) => setidCard(e.target.value)}
								required
							/>
						</div>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Password:</label>
							<input
								type='password'
								placeholder='Enter Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='col' style={{ width: '100%' }}>
							<label htmlFor=''>Confirm password:</label>

							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
							{message && (
								<ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
									{message}
								</ErrorMessage>
							)}
						</div>
						<div className='row' style={{ width: '100%' }}>
							<button
								type='submit'
								style={{
									marginTop: '1rem',
									padding: ' 0.7rem 1rem',
									border: 'none',
									borderRadius: '0.5rem',
									transition: 'all 0.2s ease-in-out',
									width: 'max-content',
									textAlign: 'center',
								}}
								className='normalButton'
							>
								Registro
							</button>
						</div>
						{error && (
							<ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
								{error}
							</ErrorMessage>
						)}
						<div className='row'>{loading && <Loading></Loading>}</div>
					</div>
					<div className='col' style={{ width: '50%' }}>
						<div className='col'>
							<label htmlFor=''>Role:</label>
							<div className='row'>
								<div className='row'>
									<input
										type='radio'
										placeholder='Confirm Password'
										value='manager'
										id='manager'
										name='role'
										onClick={(e) => {
											setRole(e.target.value)
										}}
										required
									/>

									<label htmlFor='manager'>Manager</label>

									<input
										type='radio'
										placeholder='Confirm Password'
										value='worker'
										id='worker'
										name='role'
										onClick={(e) => {
											setRole(e.target.value)
										}}
									/>
									<label htmlFor='worker'>Worker</label>
								</div>
							</div>
						</div>
						<div className='col'>
							<label htmlFor=''>Profile picture:</label>
							<label
								htmlFor='inputFile'
								style={{
									cursor: 'pointer',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									marginTop: 0,
								}}
							>
								<input
									type='text'
									placeholder={image}
									disabled
									style={{
										background: 'white',
										borderRadius: '0.5rem 0 0 0.5rem',
										padding: '0.5rem',
									}}
								/>
								<div className='browseButton' style={{ padding: '0.5rem' }}>
									Browse
								</div>
							</label>
							<span id='imageName'></span>

							<input
								type='file'
								id='inputFile'
								onChange={(e) => {
									postDetails(e.target.files[0])
									setImage(e.target.files[0].name)
								}}
								style={{ display: 'none' }}
							/>
						</div>
						{picMessage && (
							<ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
								{picMessage}
							</ErrorMessage>
						)}
					</div>
				</form>
				<button
					type='submit'
					style={{
						padding: ' 0.7rem 1rem',
						borderRadius: '0.5rem',

						width: 'max-content',
						textAlign: 'center',
						position: 'absolute',
						right: '1rem',
						bottom: '2.5rem',
					}}
					className='normalButton'
					onClick={() => navigate('/main')}
				>
					Atras
				</button>
			</div>
		</main>
	)
}

export default Register
