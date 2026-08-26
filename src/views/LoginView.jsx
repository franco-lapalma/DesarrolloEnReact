import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from '../components/ErrorMessage'
import { Icon } from '../components/Icon'

export default function LoginView() {
  const { usuario, iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const inputNombreRef = useRef(null)

  const [nombre, setNombre] = useState(usuario?.nombre ?? '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nombreLimpio = nombre.trim()
    if (!nombreLimpio) {
      setError('Ingresá tu nombre para continuar.')
      if (inputNombreRef.current) inputNombreRef.current.focus()
      return
    }
    iniciarSesion(nombreLimpio)
    navigate('/movies')
  }

  return (
    <section className="login-view" role="main">
      <div className="login-view__card">
        <div className="login-view__header">
          <div className="login-view__logo" aria-hidden>
            <Icon name="film" size={40} />
          </div>
          <h1 className="login-view__title">Bienvenido a CineFilos</h1>
          <p className="login-view__subtitle">Ingresá tu nombre para acceder a tu lista de películas</p>
        </div>

        <ErrorMessage mensaje={error} onDismiss={() => setError('')} />

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label htmlFor="nombre" className="form__label">Nombre *</label>
            <div className="form__input-wrapper">
              <Icon name="user" className="form__icon" size={20} aria-hidden />
              <input
                ref={inputNombreRef}
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value)
                  setError('')
                }}
                placeholder="Ej: Ana"
                className="form__input"
                autoComplete="name"
                autoFocus
              />
            </div>
          </div>
          <button type="submit" className="btn btn--primary btn--block btn--lg">
            <Icon name="arrowRight" size={18} aria-hidden />
            Ingresar
          </button>
        </form>
      </div>
    </section>
  )
}