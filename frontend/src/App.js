import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './screens/Login'
import Main from './screens/Main'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/main' element={<Main />} exact />
      </Routes>
    </Router>
  )
}

export default App
