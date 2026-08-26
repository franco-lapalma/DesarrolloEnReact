import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export default function NotFoundView() {
  return (
    <section className="not-found" role="main">
      <div className="not-found__content">
        <div className="not-found__code" aria-hidden>404</div>
        <h1 className="not-found__title">Página no encontrada</h1>
        <p className="not-found__message">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <Link to="/movies" className="btn btn--primary btn--lg">
          <Icon name="home" size={18} aria-hidden />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}