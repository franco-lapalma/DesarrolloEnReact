import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() // Captura de donde venia el usuario

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  // Si ya esta logueado, redirige al dashboard o a donde queria ir
  if (user) {
    const from = location.state?.from?.pathname || '/dashboard'
    return <Navigate to={from} replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Por favor ingresa un nombre de usuario')
      return
    }
    // Simulacion de login - solo guarda el nombre
    login(username.trim())
    // useLocation: redirige a la ruta que queria visitar antes del login
    const from = location.state?.from?.pathname || '/dashboard'
    navigate(from, { replace: true })
  }

  return (
    <div className="page-container">
      <h1>Iniciar Sesion</h1>

      <div className="highlight-box">
        <h3>Ruta protegida + useLocation</h3>
        <p>
          Esta es la simulacion de login. Al iniciar sesion, el usuario sera
          redirigido a la pagina que intentaba visitar originalmente, usando{' '}
          <code>useLocation()</code> para capturar la ruta anterior.
        </p>
        {location.state?.from && (
          <p>
            Ruta intentada: <code>{location.state.from.pathname}</code>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="form login-form">
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa cualquier nombre"
            autoFocus
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-primary btn-full">
          Iniciar sesion
        </button>

        <p className="form-hint">
          Cualquier nombre funciona. Es una simulacion sin backend.
        </p>
      </form>
    </div>
  )
}