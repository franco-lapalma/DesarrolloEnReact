import { useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'

export default function Contacto() {
  // useSearchParams - lee y modifica los query params de la URL
  const [searchParams, setSearchParams] = useSearchParams()
  const [enviado, setEnviado] = useState(false)

  // Leer query params individuales
  const categoria = searchParams.get('categoria') || ''
  const tema = searchParams.get('tema') || ''
  const origen = searchParams.get('origen') || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    // Modificar query params programaticamente
    setSearchParams({ categoria: 'enviado', tema: 'confirmacion' })
  }

  const setCategoria = (cat) => {
    setSearchParams(prev => {
      prev.set('categoria', cat)
      return prev
    })
  }

  const limpiarParams = () => {
    setSearchParams({})
    setEnviado(false)
  }

  return (
    <div className="page-container">
      <h1>Contacto</h1>

      <div className="highlight-box">
        <h3>Query Params (useSearchParams)</h3>
        <p>
          La URL actual es: <code>/contacto{window.location.search}</code>
        </p>
        <ul>
          <li>
            <strong>categoria:</strong> {categoria || '(vacio)'}
          </li>
          <li>
            <strong>tema:</strong> {tema || '(vacio)'}
          </li>
          <li>
            <strong>origen:</strong> {origen || '(vacio)'}
          </li>
        </ul>
        <p className="hint">
          Probá los enlaces de abajo para ver como cambian los query params.
        </p>
      </div>

      <div className="card">
        <h3>Explorar query params</h3>
        <div className="btn-group">
          <button onClick={() => setCategoria('soporte')} className="btn-secondary">
            ?categoria=soporte
          </button>
          <button onClick={() => setCategoria('ventas')} className="btn-secondary">
            ?categoria=ventas
          </button>
          <button onClick={() => setCategoria('consultas')} className="btn-secondary">
            ?categoria=consultas
          </button>
          <button onClick={limpiarParams} className="btn-secondary">
            Limpiar params
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Enlaces con query params precargados</h3>
        <p>Hacé clic en estos enlaces para ver los params en accion:</p>
        <ul className="link-list">
          <li>
            <Link to="/contacto?categoria=soporte&tema=consultas">
              ?categoria=soporte&tema=consultas
            </Link>
          </li>
          <li>
            <Link to="/contacto?categoria=ventas&tema=presupuesto&origen=google">
              ?categoria=ventas&tema=presupuesto&origen=google
            </Link>
          </li>
          <li>
            <Link to="/contacto?categoria=soporte&tema=reclamo&origen=web">
              ?categoria=soporte&tema=reclamo&origen=web
            </Link>
          </li>
        </ul>
      </div>

      {enviado ? (
        <div className="card success-card">
          <h3>Mensaje enviado con exito</h3>
          <p>Tu consulta fue registrada. Te responderemos a la brevedad.</p>
          <button onClick={limpiarParams} className="btn-secondary">
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h3>Formulario de contacto</h3>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input id="nombre" type="text" placeholder="Tu nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" rows="4" placeholder="Escribi tu consulta..." required />
          </div>
          <button type="submit" className="btn-primary btn-full">
            Enviar mensaje
          </button>
          <p className="form-hint">
            Al enviar, los query params cambiaran automaticamente usando setSearchParams.
          </p>
        </form>
      )}

      <Link to="/" className="back-link">&larr; Volver al inicio</Link>
    </div>
  )
}