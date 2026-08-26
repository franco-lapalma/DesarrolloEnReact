import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import RatingStars from './RatingStars'
import Skeleton from './Skeleton'
import { PLACEHOLDER_POSTER } from './placeholders'

export default function MovieCard({ pelicula, onToggleFavorita, deshabilitado, variant = 'default' }) {
  if (variant === 'skeleton') {
    return <Skeleton variant="card" />
  }

  if (!pelicula) {
    return <Skeleton variant="card" />
  }

  const { titulo, anio, genero, rating = 0, favorita = false, posterUrl, id } = pelicula
  const poster = posterUrl || PLACEHOLDER_POSTER

  return (
    <article className={`movie-card ${favorita ? 'movie-card--favorita' : ''}`} data-id={id}>
      <Link to={`/movies/${id}`} className="movie-card__link" aria-label={`Ver detalle de ${titulo}`}>
        <div className="movie-card__poster-wrapper">
          <img
            className="movie-card__poster"
            src={poster}
            alt={`${titulo} póster`}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = PLACEHOLDER_POSTER }}
          />
          <div className="movie-card__overlay">
            <span className="movie-card__play-btn" aria-hidden>
              <Icon name="play" size={32} />
            </span>
          </div>
          {favorita && (
            <span className="movie-card__badge" aria-label="Favorita" title="Favorita">
              <Icon name="star" size={16} aria-hidden />
            </span>
          )}
        </div>
        <div className="movie-card__info">
          <h3 className="movie-card__title">{titulo}</h3>
          <div className="movie-card__meta">
            <span className="movie-card__year">{anio}</span>
            <span className="movie-card__dot" aria-hidden>•</span>
            <span className="movie-card__genre">{genero}</span>
          </div>
          <div className="movie-card__rating">
            <RatingStars rating={rating} size="sm" />
            <span className="movie-card__rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      {/* Botón de favorita: arriba a la izquierda del póster,
          siempre visible, SIN superponerse a la info/rating. */}
      <button
        type="button"
        className={`movie-card__fav ${favorita ? 'movie-card__fav--active' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onToggleFavorita?.(pelicula)
        }}
        disabled={deshabilitado}
        aria-pressed={favorita}
        aria-label={favorita ? 'Quitar de favoritas' : 'Marcar como favorita'}
        title={favorita ? 'Quitar de favoritas' : 'Marcar como favorita'}
      >
        {favorita ? <Icon name="heart" size={18} /> : <Icon name="heartOutline" size={18} />}
      </button>
    </article>
  )
}
