import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'

function Main() {
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
		<main>
			<div className='menu'>
				<Link to='/perms'>
					<button className='mainButton'>Permisos de horas extras</button>
				</Link>

				{userInfo.isAdmin ? (
					<Link to='/register'>
						<button className='mainButton'>
							<i className='fa-solid fa-gear'></i>
							Nuevo usuario
						</button>
					</Link>
				) : (
					''
				)}

				<button className='mainButton' onClick={logoutHandler}>
					Salir
				</button>
			</div>
			<div className='context'>
				<div className='modalHours'>
					<div className='title'>Operaciones</div>

					<div className='subtitle'>PERSON</div>
				</div>
			</div>
		</main>
	)
}

export default Main
