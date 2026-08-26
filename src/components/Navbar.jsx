import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from './Icon'
import SearchBar from './SearchBar'

export default function Navbar({ onSearch }) {
  const { usuario, cerrarSesion } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/movies' || location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar" role="banner">
      <Link to="/movies" className="navbar__brand" aria-label="CineFilos - Inicio">
        <Icon name="film" size={28} aria-hidden />
        <span className="navbar__brand-text">CineFilos</span>
      </Link>

      <button
        type="button"
        className="navbar__menu-toggle"
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <Icon name={menuOpen ? 'x' : 'info'} size={22} />
      </button>

      <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`} aria-label="Navegación principal">
        <NavLink
          to="/movies"
          className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
          end
          onClick={() => setMenuOpen(false)}
        >
          <Icon name="home" size={20} aria-hidden />
          <span>Inicio</span>
        </NavLink>
        <NavLink
          to="/movies/new"
          className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Icon name="plus" size={20} aria-hidden />
          <span>Nueva</span>
        </NavLink>
      </nav>

      <div className="navbar__search">
        {isHome && <SearchBar onBuscar={onSearch} placeholder="Buscar películas..." />}
      </div>

      <div className="navbar__user">
        {usuario ? (
          <div className="user-menu">
            <button className="user-menu__trigger" aria-label={`Menú de usuario ${usuario.nombre}`}>
              <span className="user-menu__avatar" aria-hidden>
                {usuario.nombre.charAt(0).toUpperCase()}
              </span>
              <span className="user-menu__name">{usuario.nombre}</span>
            </button>
            <button className="btn btn--ghost btn--sm" onClick={cerrarSesion}>
              <Icon name="logOut" size={16} aria-hidden />
              <span>Salir</span>
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn--primary btn--sm">
            <Icon name="user" size={18} aria-hidden />
            <span>Ingresar</span>
          </NavLink>
        )}
      </div>
    </header>
  )
}
