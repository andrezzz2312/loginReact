import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as THREE from 'three'

import axios from 'axios'

const Login = () => {
  const [notes, setNotes] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState('')
  const [loaded, setLoaded] = useState(false)

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
  function onWindowResize() {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
  }
  window.addEventListener('resize', onWindowResize, false)

  const submitHandler = (e) => {
    console.log(email, password)
  }

  const fetchUsers = async () => {
    const {data} = await axios.get('/api/notes')
    console.log('test')
    setNotes(data)
  }

  useEffect(() => {
    init()
    animate()

    fetchUsers()
  }, [])

  return (
    // <Container>
    //   <Row className='d-flex align-items-center justify-content-center '>
    //     <Col className='w-50'>
    //       <Form onSubmit={submitHandler}>
    //         <Form.Group controlId='formBasicEmail'>
    //           <Form.Label>Email address</Form.Label>
    //           <Form.Control
    //             type='email'
    //             value={email}
    //             placeholder='Enter email'
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Form.Group controlId='formBasicPassword'>
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type='password'
    //             value={password}
    //             placeholder='Password'
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Button variant='primary' type='submit'>
    //           Submit
    //         </Button>
    //       </Form>
    //     </Col>

    //     <Col className='w-50'>asd</Col>
    //   </Row>
    // </Container>

    <main>
      <div className='left'>
        <div className='form'>
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
            type='text'
          />
          <Link to={`/main`}>
            <button
              style={{
                marginTop: '0.5rem',
                padding: ' 0.5rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className='right'>
        <div className='three'></div>
      </div>
    </main>
  )
}

export default Login
