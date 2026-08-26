import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <Icon name="film" size={20} aria-hidden />
          <span>CineFilos</span>
        </div>
        <p className="app-footer__text">
          Mis películas favoritas — CRUD con React, React Router y Firebase Firestore.
        </p>
        <nav className="app-footer__nav" aria-label="Navegación del pie">
          <Link to="/movies">Inicio</Link>
          <Link to="/movies/new">Nueva</Link>
          <Link to="/login">Ingresar</Link>
        </nav>
        <p className="app-footer__copy">© {year} CineFilos. Hecho con React.</p>
      </div>
    </footer>
  )
}
