import { useState, useEffect, useRef } from 'react'
import UsuarioCard from './UsuarioCard'
import Buscador from './Buscador'
import './Usuarios.css'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
const INITIAL_LOAD_DELAY = 1500 // ms para ver el loading

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('')
  const isFirstLoad = useRef(true)

  const fetchUsuarios = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_URL)
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      
      // Simular delay solo en la primera carga
      if (isFirstLoad.current) {
        await new Promise(r => setTimeout(r, INITIAL_LOAD_DELAY))
        isFirstLoad.current = false
      }
      
      setUsuarios(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const usuariosFiltrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(filtro.toLowerCase())
  )

  const handleRecargar = () => {
    // NO resetear el filtro - mantener la búsqueda actual
    fetchUsuarios()
  }

  const handleFiltroChange = (valor) => {
    setFiltro(valor)
  }

  if (loading) {
    return (
      <div className="state-card loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-text">Cargando usuarios<span className="dots"></span></p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-card error" role="alert">
        <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>No se pudo cargar</h3>
        <p>{error}</p>
        <button onClick={handleRecargar} className="btn btn-error">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M21 12a9 9 0 1 1-9 9c2.52 0 4.93-1 6.74-2.74L21 8"/>
          </svg>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="usuarios-container">
      <header className="container-header">
        <div>
          <h2>Directorio</h2>
          <p className="subtitle">{usuariosFiltrados.length} de {usuarios.length} usuarios</p>
        </div>
        <button onClick={handleRecargar} className="btn btn-primary" aria-label="Recargar lista">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M21 12a9 9 0 1 1-9 9c2.52 0 4.93-1 6.74-2.74L21 8"/>
          </svg>
          Recargar
        </button>
      </header>

      <div className="search-wrapper">
        <Buscador value={filtro} onSearch={handleFiltroChange} placeholder="Buscar por nombre, email, ciudad..." />
      </div>

      <ul className="users-grid" role="list">
        {usuariosFiltrados.map(usuario => (
          <UsuarioCard key={usuario.id} usuario={usuario} />
        ))}
      </ul>

      {usuariosFiltrados.length === 0 && usuarios.length > 0 && (
        <div className="no-results" role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <p>No hay coincidencias para <strong>"{filtro}"</strong></p>
          <button onClick={() => setFiltro('')} className="btn btn-ghost">
            Limpiar búsqueda
          </button>
        </div>
      )}

      {usuarios.length === 0 && !loading && !error && (
        <div className="no-results">
          <p>No hay usuarios disponibles</p>
        </div>
      )}
    </div>
  )
}

export default Usuarios