import axios from 'axios'
import React, {useState} from 'react'
import ErrorMessage from '../components/Header/ErrorMessage'
import Loading from '../components/Header/Loading'

const Register = () => {
  const [image, setImage] = useState('Upload Profile Picture')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      setMessage(null)
      try {
        const config = {
          header: {
            'Content-type': 'application/json',
          },
        }
        setLoading(true)

        const {data} = await axios.post(
          'api/users',
          {name, pic, email, password},
          config
        )
        console.log(data)
        setLoading(false)
        // quitar esto por que remplaza el usuario
        // localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
        setError(error.response.data.message)
      }
    }
  }

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage('Please Select an Image')
    }

    setPicMessage(null)
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'wiretracker')
      data.append('cloud_name', 'wireframeguayaquil')
      fetch('https://api.cloudinary.com/v1_1/wireframeguayaquil/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log(pics.type)
      return setPicMessage('Please Select an Image')
    }
  }
  return (
    <main>
      <div className='modalHours'>
        <div className='title'>Registro</div>
        <form onSubmit={submitHandler} className='content'>
          <div className='col'>
            <label htmlFor=''>Name:</label>
            <input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='col'>
            <label htmlFor=''>Email:</label>
            <input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='col'>
            <label htmlFor=''>Password:</label>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='col'>
            <label htmlFor=''>Confirm password:</label>
            <div className='row'>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {message && (
                <ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
                  {message}
                </ErrorMessage>
              )}
            </div>
          </div>
          <div className='col'>
            <label htmlFor=''>Profile picture:</label>
            <label
              htmlFor='inputFile'
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
              }}
            >
              <input
                type='text'
                placeholder={image}
                disabled
                style={{
                  background: 'white',
                  borderRadius: '0.5rem 0 0 0.5rem',
                  padding: '0.5rem',
                }}
              />
              <div className='browseButton' style={{padding: '0.5rem'}}>
                Browse
              </div>
            </label>
            <span id='imageName'></span>

            <input
              type='file'
              id='inputFile'
              onChange={(e) => {
                postDetails(e.target.files[0])
                setImage(e.target.files[0].name)
              }}
              style={{display: 'none'}}
            />
          </div>
          {picMessage && (
            <ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
              {picMessage}
            </ErrorMessage>
          )}
          <div className='row'>
            <button
              type='submit'
              style={{
                marginTop: '1rem',
                padding: ' 0.7rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease-in-out',
                width: '20%',
                textAlign: 'center',
              }}
            >
              Register
            </button>
          </div>
          {error && (
            <ErrorMessage color='rgb(252, 41, 41)' fontColor='white'>
              {error}
            </ErrorMessage>
          )}
          <div className='row'>{loading && <Loading></Loading>}</div>
        </form>
      </div>
    </main>
  )
}

export default Register
