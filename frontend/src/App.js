import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './screens/Login'
import Main from './screens/Main'
import Register from './screens/Register'
import Perms from './screens/Perms'
import CreatePerm from './screens/CreatePerm'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} exact />
				<Route path='/main' element={<Main />} exact />
				<Route path='/register' element={<Register />} exact />
				<Route path='/createperm' element={<CreatePerm />} exact />
				<Route path='/perms' element={<Perms />} exact />
			</Routes>
		</Router>
	)
}

export default App

