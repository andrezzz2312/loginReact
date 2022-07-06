import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Main() {
  const navigate = useNavigate()
  return (
    <main>
      <div className='menu'>
        <button id='bodegas'>
          <i className='fa-solid fa-house-chimney'></i>
          Casa
        </button>
        <button>
          <i className='fa-solid fa-table-list'></i>
          Ventas
        </button>
        <button>
          <i className='fa-solid fa-user'></i>
          Usuario
        </button>
        <button>
          <i className='fa-solid fa-gear'></i>
          Configuracion
        </button>
        <Link to='/register'>
          <button>
            <i className='fa-solid fa-gear'></i>
            Nuevo usuario
          </button>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('userInfo')
            navigate('/')
          }}
        >
          Salir
        </button>
      </div>
      <div className='context'>
        <div className='modalHours'>
          <div className='title'>Operaciones</div>
          <div className='subtitle'>PERSON</div>
        </div>
      </div>
    </main>
  )
}

export default Main
