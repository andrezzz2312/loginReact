import React, {useState, useEffect} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import * as THREE from 'three'
import Loading from '../components/Header/Loading'
import axios from 'axios'
import ErrorMessage from '../components/Header/ErrorMessage'

let scene, camera, renderer, cube, canvas
function init() {
  scene = new THREE.Scene()
  canvas = document.querySelector('.three')
  camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / canvas.offsetHeight,
    0.1,
    1000
  )

  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

  canvas.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5
}

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
const Login = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function onWindowResize() {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
  }
  window.addEventListener('resize', onWindowResize, false)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      setLoading(true)
      const {data} = await axios.post(
        '/api/users/login',
        {email, password},
        config
      )
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      navigate('/main ')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
    console.log(email, password)
  }

  const fetchUsers = async () => {}

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      navigate('/main ')
    }
  }, [history])

  useEffect(() => {
    init()
    animate()
    fetchUsers()
  }, [])

  return (
    <main>
      <div className='left'>
        <form className='loginForm' onSubmit={submitHandler}>
          <input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />

          <input
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />

          <button
            type='submit'
            style={{
              marginTop: '0.5rem',
              padding: ' 0.5rem 1rem',
              border: 'none',
              borderRadius: '0.5rem',
              transition: 'all 0.2s ease-in-out',
              width: '50%',
            }}
          >
            Login
          </button>
        </form>
        {error && (
          <ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
            {error}
          </ErrorMessage>
        )}
        {loading && <Loading />}
      </div>
      <div className='right'>
        <div className='three'></div>
      </div>
    </main>
  )
}

export default Login
