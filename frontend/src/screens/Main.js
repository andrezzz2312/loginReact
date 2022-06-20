import React from 'react'

function Main() {
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
