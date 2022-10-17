import axios from 'axios'
import {
	PERM_LIST_FAIL,
	PERM_LIST_REQUEST,
	PERM_LIST_SUCCESS,
} from '../constants/permConstants'

export const listNodes = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PERM_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer${userInfo.token}`,
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
