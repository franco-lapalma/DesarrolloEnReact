import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>Mini Dashboard</Link>
      </div>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" className={linkClass} end onClick={closeMenu}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/nosotros" className={linkClass} onClick={closeMenu}>
            Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={linkClass} onClick={closeMenu}>
            Contacto
          </NavLink>
        </li>
        <li>
          <NavLink to="/producto/1" className={linkClass} onClick={closeMenu}>
            Producto
          </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar sesion ({user.username})
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="btn-login" onClick={closeMenu}>
              Iniciar sesion
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}