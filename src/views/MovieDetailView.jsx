import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as moviesService from '../services/moviesService'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import RatingStars from '../components/RatingStars'
import ConfirmDialog from '../components/ConfirmDialog'
import { Icon } from '../components/Icon'
import Skeleton from '../components/Skeleton'
import { PLACEHOLDER_BACKDROP, PLACEHOLDER_POSTER } from '../components/placeholders'

export default function MovieDetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pelicula, setPelicula] = useState(null)
  const [noEncontrada, setNoEncontrada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [toggling, setToggling] = useState(false)
  const [preguntandoEliminar, setPreguntandoEliminar] = useState(false)
  const [eliminando, setEliminando] = useState(false)

  const cargar = useCallback(async () => {
    setCargando(true)
    setError('')
    setNoEncontrada(false)
    try {
      const dato = await moviesService.obtenerPorId(id)
      if (!dato) {
        setNoEncontrada(true)
      } else {
        setPelicula(dato)
      }
    } catch (err) {
      console.error(err)
      setError('No se pudo cargar la película.')
    } finally {
      setCargando(false)
    }
  }, [id])

  useEffect(() => {
    cargar()
  }, [cargar])

  const manejarToggleFavorita = async () => {
    if (!pelicula) return
    setToggling(true)
    setError('')
    try {
      const actualizado = await moviesService.cambiarEstado(pelicula.id, !pelicula.favorita)
      setPelicula((actual) => ({ ...actual, favorita: actualizado.favorita }))
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado de favorita.')
    } finally {
      setToggling(false)
    }
  }

  const confirmarEliminacion = async () => {
    if (!pelicula) return
    setEliminando(true)
    setError('')
    try {
      await moviesService.eliminar(pelicula.id)
      setPreguntandoEliminar(false)
      navigate('/movies')
    } catch (err) {
      console.error(err)
      setError('No se pudo eliminar la película.')
      setEliminando(false)
    }
  }

  if (cargando) {
    return (
      <div className="movie-detail movie-detail--loading">
        <div className="movie-detail__backdrop">
          <Skeleton variant="backdrop" />
        </div>
        <div className="movie-detail__gradient" />
        <div className="movie-detail__content">
          <Skeleton variant="poster" style={{ width: 240, height: 360, marginBottom: '1.5rem' }} />
          <Skeleton variant="text" lines={2} style={{ maxWidth: '400px' }} />
          <Skeleton variant="text" lines={4} style={{ maxWidth: '600px', marginTop: '1rem' }} />
        </div>
      </div>
    )
  }

  if (noEncontrada) {
    return (
      <div className="movie-detail movie-detail--not-found">
        <div className="movie-detail__backdrop" style={{ background: '#111' }} />
        <div className="movie-detail__content">
          <div className="movie-detail__not-found">
            <Icon name="film" size={64} className="movie-detail__not-found-icon" />
            <h1>Película no encontrada</h1>
            <p>La película que buscás no existe o fue eliminada.</p>
            <Link to="/movies" className="btn btn--primary btn--lg">
              <Icon name="arrowRight" size={18} aria-hidden />
              Volver al listado
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!pelicula) {
    return (
      <div className="movie-detail movie-detail--error">
        <div className="movie-detail__backdrop" style={{ background: '#111' }} />
        <div className="movie-detail__content">
          <ErrorMessage mensaje={error} onDismiss={() => setError('')} />
          <Link to="/movies" className="btn btn--primary btn--lg">
            <Icon name="arrowRight" size={18} aria-hidden />
            Volver al listado
          </Link>
        </div>
      </div>
    )
  }

  const { titulo, anio, genero, rating, favorita, sinopsis, backdropUrl, posterUrl, id: peliculaId } = pelicula
  const backdrop = backdropUrl || PLACEHOLDER_BACKDROP
  const poster = posterUrl || PLACEHOLDER_POSTER

  return (
    <div className="movie-detail">
      <div className="movie-detail__backdrop">
        <img
          src={backdrop}
          alt=""
          aria-hidden
          onError={(e) => { e.currentTarget.src = PLACEHOLDER_BACKDROP }}
        />
      </div>
      <div className="movie-detail__gradient" />
      <div className="movie-detail__content">
        <Link to="/movies" className="movie-detail__back-link" aria-label="Volver al listado">
          <Icon name="chevronLeft" size={20} aria-hidden />
          Volver
        </Link>

        <div className="movie-detail__main">
          <div className="movie-detail__poster-wrapper">
            <img
              className="movie-detail__poster"
              src={poster}
              alt={`${titulo} póster`}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER_POSTER }}
            />
          </div>

          <div className="movie-detail__info">
            <div className="movie-detail__meta">
              <span className="movie-detail__year">{anio}</span>
              <span className="movie-detail__separator" aria-hidden>•</span>
              <span className="movie-detail__genre">{genero}</span>
              <span className="movie-detail__separator" aria-hidden>•</span>
              <span className="movie-detail__rating">
                <RatingStars rating={rating} size={18} />
                <span>{rating.toFixed(1)} / 5</span>
              </span>
            </div>

            <h1 className="movie-detail__title">{titulo}</h1>

            {sinopsis && (
              <p className="movie-detail__sinopsis">{sinopsis}</p>
            )}

            <div className="movie-detail__actions">
              <FavoriteButton
                favorita={favorita}
                onToggle={manejarToggleFavorita}
                deshabilitado={toggling}
                size="lg"
                showLabel
              />
              <Link
                to={`/movies/${peliculaId}/edit`}
                className="btn btn--secondary btn--lg"
              >
                <Icon name="edit" size={18} aria-hidden />
                Editar
              </Link>
              <button
                type="button"
                className="btn btn--danger btn--lg"
                onClick={() => setPreguntandoEliminar(true)}
                disabled={eliminando}
              >
                <Icon name="trash" size={18} aria-hidden />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ErrorMessage mensaje={error} onDismiss={() => setError('')} />

      <ConfirmDialog
        abierto={preguntandoEliminar}
        titulo="Eliminar película"
        mensaje={`¿Estás seguro de que querés eliminar "${titulo}"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setPreguntandoEliminar(false)}
      />
    </div>
  )
}