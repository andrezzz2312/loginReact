// import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { permListReducer } from './reducers/permReducer'
// const store = configureStore({
// 	// reducer,
// 	// initialState,
// 	// applyMiddleware(...middleWare)
// 	reducer: {},
// })

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	permList: permListReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}
const middleWare = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
