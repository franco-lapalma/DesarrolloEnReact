import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import RatingStars from './RatingStars'
import Skeleton from './Skeleton'
import { PLACEHOLDER_BACKDROP, PLACEHOLDER_POSTER } from './placeholders'

export default function Hero({ pelicula, variant = 'default' }) {
  if (!pelicula || variant === 'skeleton') {
    return (
      <section className="hero hero--skeleton" aria-hidden>
        <div className="hero__backdrop">
          <Skeleton variant="backdrop" />
        </div>
        <div className="hero__gradient" />
        <div className="hero__content">
          <Skeleton variant="text" lines={3} style={{ maxWidth: '600px' }} />
        </div>
      </section>
    )
  }

  const { titulo, anio, genero, rating, sinopsis, backdropUrl, posterUrl, favorita, id } = pelicula
  const backdrop = backdropUrl || PLACEHOLDER_BACKDROP
  const poster = posterUrl || PLACEHOLDER_POSTER

  return (
    <section className="hero" role="region" aria-label={`Destacado: ${titulo}`}>
      <div className="hero__backdrop">
        <img
          src={backdrop}
          alt=""
          aria-hidden
          onError={(e) => { e.currentTarget.src = PLACEHOLDER_BACKDROP }}
        />
      </div>
      <div className="hero__gradient" />
      <div className="hero__content">
        <div className="hero__poster-wrapper">
          <img
            className="hero__poster"
            src={poster}
            alt={`${titulo} póster`}
            onError={(e) => { e.currentTarget.src = PLACEHOLDER_POSTER }}
          />
        </div>
        <div className="hero__info">
          <div className="hero__meta">
            <span className="hero__year">{anio}</span>
            <span className="hero__separator" aria-hidden>•</span>
            <span className="hero__genre">{genero}</span>
            <span className="hero__separator" aria-hidden>•</span>
            <span className="hero__rating">
              <RatingStars rating={rating} size={16} />
              <span>{rating.toFixed(1)}</span>
            </span>
          </div>
          <h1 className="hero__title">{titulo}</h1>
          {sinopsis && <p className="hero__sinopsis">{sinopsis}</p>}
          <div className="hero__actions">
            <Link to={`/movies/${id}`} className="btn btn--primary btn--lg">
              <Icon name="play" size={18} aria-hidden />
              Ver detalle
            </Link>
            <Link
              to={`/movies/${id}`}
              className={`btn btn--secondary btn--lg ${favorita ? 'btn--favorita' : ''}`}
              aria-pressed={favorita}
              aria-label={favorita ? 'Quitar de favoritas' : 'Agregar a favoritas'}
            >
              <Icon name={favorita ? 'heart' : 'heartOutline'} size={18} aria-hidden />
              {favorita ? 'En favoritas' : 'Ver detalle'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
