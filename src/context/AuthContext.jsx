import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'usuario_mis_peliculas'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY)
      return guardado ? JSON.parse(guardado) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [usuario])

  const iniciarSesion = (nombre) => {
    setUsuario({ nombre })
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return contexto
}