import axios from 'axios'
import {
	PERM_CREATE_FAIL,
	PERM_CREATE_REQUEST,
	PERM_CREATE_SUCCESS,
	PERM_LIST_FAIL,
	PERM_LIST_REQUEST,
	PERM_LIST_SUCCESS,
} from '../constants/permConstants'

export const listPerms = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PERM_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/perms`, config)

		dispatch({
			type: PERM_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: PERM_LIST_FAIL,
			payload: message,
		})
	}
}

export const createPermAction =
	// (poner aqui los campos que hacen falta para crear el permiso)


		(department, workerWorkHours, requestedHours, description) =>
		async (dispatch, getState) => {
			try {
				dispatch({
					type: PERM_CREATE_REQUEST,
				})
				const {
					userLogin: { userInfo },
				} = getState()

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
				const { data } = await axios.post(
					`/api/perms/create`,
					{ department, workerWorkHours, requestedHours, description },
					config
				)
				dispatch({ type: PERM_CREATE_SUCCESS, payload: data })
			} catch (error) {
				const message =
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
				dispatch({
					type: PERM_CREATE_FAIL,
					payload: message,
				})
			}
		}
