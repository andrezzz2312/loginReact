import {
	PERM_CREATE_FAIL,
	PERM_CREATE_REQUEST,
	PERM_CREATE_SUCCESS,
	PERM_LIST_FAIL,
	PERM_LIST_REQUEST,
	PERM_LIST_SUCCESS,
} from '../constants/permConstants'

export const permListReducer = (state = { perms: [] }, action) => {
	switch (action.type) {
		case PERM_LIST_REQUEST:
			return { loading: true }
		case PERM_LIST_SUCCESS:
			return { loading: false, perms: action.payload }
		case PERM_LIST_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const permCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PERM_CREATE_REQUEST:
			return { loading: true }
		case PERM_CREATE_SUCCESS:
			return { loading: false, success: true }
		case PERM_CREATE_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
