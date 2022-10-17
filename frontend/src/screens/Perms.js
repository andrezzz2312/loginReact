import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Main from './Main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const Perms = () => {
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

	return (
		<main style={{ width: '100%', height: '100vh' }}>
			<div className='modalHours'>
				<div className='title'>Permisos</div>

				<div className='subtitle'>
					<Link to='createnote'>
						<button className='normalButton'>Create new note</button>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Perms
