import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase/config'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthButtons = () => {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
        setMensaje('Usuario registrado correctamente')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        setMensaje('Sesión iniciada correctamente')
      }
      setTipoMensaje('success')
      setEmail('')
      setPassword('')
      setShowModal(false)
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setMensaje('Sesión cerrada')
      setTipoMensaje('success')
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    }
  }

  if (user) {
    return (
      <div className="user-menu">
        <span>👤 {user.email}</span>
        <button onClick={handleLogout} className="btn-secondary btn-sm">
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => { setIsRegister(false); setShowModal(true); }} className="btn-primary">
        Iniciar Sesión
      </button>
      <button onClick={() => { setIsRegister(true); setShowModal(true); }} className="btn-secondary">
        Registrarse
      </button>
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h3>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            <form onSubmit={handleSubmit} className="form-group">
              <div className="input-group">
                <label>Email: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  autoFocus
                />
              </div>
              <div className="input-group">
                <label>Contraseña: </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (mín. 6 caracteres)"
                  required
                />
              </div>
              {mensaje && (
                <div className={`mensaje ${tipoMensaje}`}>
                  {mensaje}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary btn-full">
                {loading ? 'Procesando...' : (isRegister ? 'Registrarse' : 'Iniciar Sesión')}
              </button>
            </form>
            
            <p className="modal-switch">
              {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              <button type="button" onClick={() => setIsRegister(!isRegister)} className="link-btn">
                {isRegister ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}