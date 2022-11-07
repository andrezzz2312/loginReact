import axios from 'axios'
import {
	PERM_CREATE_REQUEST,
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
=> async (dispatch,getState) => {
	try{
		dispatch({
			type:PERM_CREATE_REQUEST
		})
		const {
			userLogin: {userInfo},

		} = getState()

		const config
	}
}