import React, { useState, useRef } from 'react'

export default function FormularioEventos() {
  // Estado del formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')

  // Estados para mensajes de foco
  const [focusNombre, setFocusNombre] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)

  // Estado para el mensaje de Enter
  const [enterMessage, setEnterMessage] = useState('')

  // Estado para el hover del boton
  const [btnHover, setBtnHover] = useState(false)

  // Estado para datos enviados
  const [enviado, setEnviado] = useState(null)

  // Log de eventos
  const [eventLog, setEventLog] = useState([])
  const logRef = useRef(null)

  const addLog = (tipo, campo, valor) => {
    const entry = `[${new Date().toLocaleTimeString()}] <span class="event-type">${tipo}</span> | <span class="event-field">${campo}</span>: <span class="event-value">${valor}</span>`
    setEventLog(prev => [entry, ...prev].slice(0, 50))
  }

  const clearLog = () => setEventLog([])

  // ===== EVENT HANDLERS =====

  const handleNombreChange = (e) => {
    setNombre(e.target.value)
    console.log('onChange (nombre):', e.target.value)
    addLog('onChange', 'nombre', e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    console.log('onChange (email):', e.target.value)
    addLog('onChange', 'email', e.target.value)
  }

  const handleNombreFocus = () => {
    setFocusNombre(true)
    console.log('onFocus: campo nombre activo')
    addLog('onFocus', 'nombre', '(campo activo)')
  }

  const handleNombreBlur = () => {
    setFocusNombre(false)
    console.log('onBlur: campo nombre perdio el foco')
    addLog('onBlur', 'nombre', '(foco perdido)')
  }

  const handleEmailFocus = () => {
    setFocusEmail(true)
    console.log('onFocus: campo email activo')
    addLog('onFocus', 'email', '(campo activo)')
  }

  const handleEmailBlur = () => {
    setFocusEmail(false)
    console.log('onBlur: campo email perdio el foco')
    addLog('onBlur', 'email', '(foco perdido)')
  }

  const handleNombreKeyDown = (e) => {
    console.log('onKeyDown (nombre):', e.key)
    addLog('onKeyDown', 'nombre', `tecla: ${e.key}`)

    if (e.key === 'Enter') {
      setEnterMessage(`Presionaste Enter en el campo nombre. Valor actual: "${nombre}"`)
      console.log('Se presiono Enter en el campo nombre')
    } else {
      setEnterMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevenir comportamiento por defecto
    console.log('onSubmit: formulario enviado')
    console.log('Datos ingresados:', { nombre, email })

    const datos = { nombre, email }
    setEnviado(datos)

    addLog('onSubmit', 'formulario', JSON.stringify(datos))
  }

  const handleReset = () => {
    setNombre('')
    setEmail('')
    setEnviado(null)
    setEnterMessage('')
  }

  return (
    <div>
      {/* Explicacion */}
      <div className="highlight-box">
        <h3>Eventos implementados en este formulario</h3>
        <p>
          <code>onChange</code> registra cambios en ambos campos &bull;{' '}
          <code>onFocus</code> / <code>onBlur</code> muestran mensajes de foco &bull;{' '}
          <code>onSubmit</code> con <code>preventDefault()</code> &bull;{' '}
          <code>onKeyDown</code> detecta Enter en el nombre &bull;{' '}
          <code>onMouseEnter</code> / <code>onMouseLeave</code> en el boton
        </p>
      </div>

      {/* Formulario */}
      {enviado ? (
        <div className="card success-card">
          <h3>Formulario enviado correctamente</h3>
          <div className="submitted-data">
            <h4>Datos recibidos:</h4>
            <pre>{JSON.stringify(enviado, null, 2)}</pre>
          </div>
          <p>Los datos tambien se muestran en la consola del navegador.</p>
          <button className="btn-submit" style={{ marginTop: '1rem' }} onClick={handleReset}>
            Enviar otro formulario
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>Formulario Controlado con Eventos</h2>
          <p>Completa los campos y observa los eventos en consola y en el panel de abajo.</p>

          <form className="form" onSubmit={handleSubmit}>
            {/* Campo nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                onFocus={handleNombreFocus}
                onBlur={handleNombreBlur}
                onKeyDown={handleNombreKeyDown}
                placeholder="Escribe tu nombre"
              />
              <span className="focus-message">
                {focusNombre ? '✎ Campo nombre activo — escribiendo...' : ''}
              </span>
            </div>

            {/* Campo email */}
            <div className="form-group">
              <label htmlFor="email">Correo electronico:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                placeholder="tu@email.com"
              />
              <span className="focus-message">
                {focusEmail ? '✎ Campo email activo — escribiendo...' : ''}
              </span>
            </div>

            {/* Mensaje de Enter */}
            {enterMessage && (
              <div className="enter-message">
                {enterMessage}
              </div>
            )}

            {/* Boton con onMouseEnter / onMouseLeave */}
            <button
              type="submit"
              className={`btn-submit ${btnHover ? 'hover-active' : ''}`}
              onMouseEnter={() => {
                setBtnHover(true)
                console.log('onMouseEnter: mouse entro al boton')
                addLog('onMouseEnter', 'boton', '(hover activo)')
              }}
              onMouseLeave={() => {
                setBtnHover(false)
                console.log('onMouseLeave: mouse salio del boton')
                addLog('onMouseLeave', 'boton', '(hover inactivo)')
              }}
            >
              Enviar formulario
            </button>
          </form>
        </div>
      )}

      {/* Panel de log de eventos */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>Registro de eventos</h3>
          <button className="btn-clear" onClick={clearLog}>Limpiar log</button>
        </div>
        <p>Los eventos se registran tanto en la consola del navegador como en este panel.</p>
        <div className="event-log" ref={logRef}>
          {eventLog.length === 0 ? (
            <div style={{ color: '#78716c', fontSize: '0.8rem' }}>
              Interactua con el formulario para ver los eventos aqui...
            </div>
          ) : (
            eventLog.map((entry, i) => (
              <div key={i} className="event-log-entry" dangerouslySetInnerHTML={{ __html: entry }} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
