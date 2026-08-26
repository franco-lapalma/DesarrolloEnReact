import { useCallback, useEffect, useMemo, useState } from 'react'
import * as moviesService from '../services/moviesService'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'
import MovieRow from '../components/MovieRow'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmDialog from '../components/ConfirmDialog'
import Skeleton from '../components/Skeleton'

const GENEROS = [
  'Acción',
  'Animación',
  'Aventura',
  'Ciencia ficción',
  'Comedia',
  'Crimen',
  'Documental',
  'Drama',
  'Fantástico',
  'Musical',
  'Romance',
  'Suspenso',
  'Terror',
  'Western',
]

export default function MoviesListView({ onSearch, searchQuery = '' }) {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [termino, setTermino] = useState('')
  const [idToggleFavorita, setIdToggleFavorita] = useState(null)
  const [idEliminar, setIdEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)

  const cargarPeliculas = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const datos = await moviesService.obtenerTodas()
      setPeliculas(datos)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar las películas. Verificá la conexión con Firebase.')
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarPeliculas()
  }, [cargarPeliculas])

  useEffect(() => {
    setTermino(searchQuery)
  }, [searchQuery])

  const peliculasFiltradas = useMemo(() => {
    const texto = termino.trim().toLowerCase()
    if (!texto) return peliculas
    return peliculas.filter((p) => p.titulo.toLowerCase().includes(texto))
  }, [peliculas, termino])

  const peliculaDestacada = useMemo(() => {
    const favoritas = peliculasFiltradas.filter((p) => p.favorita)
    return favoritas[0] || peliculasFiltradas[0] || null
  }, [peliculasFiltradas])

  const peliculasPorGenero = useMemo(() => {
    const grupos = {}
    GENEROS.forEach((g) => { grupos[g] = [] })
    peliculasFiltradas.forEach((p) => {
      if (grupos[p.genero]) grupos[p.genero].push(p)
    })
    return Object.entries(grupos).filter(([, arr]) => arr.length > 0)
  }, [peliculasFiltradas])

  const manejarBusqueda = (texto) => {
    setTermino(texto)
    onSearch?.(texto)
  }

  const manejarToggleFavorita = async (pelicula) => {
    setIdToggleFavorita(pelicula.id)
    setError('')
    try {
      const actualizado = await moviesService.cambiarEstado(pelicula.id, !pelicula.favorita)
      setPeliculas((actuales) =>
        actuales.map((p) => (p.id === actualizado.id ? { ...p, favorita: actualizado.favorita } : p))
      )
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el estado de favorita.')
    } finally {
      setIdToggleFavorita(null)
    }
  }

  const confirmarEliminacion = async () => {
    setEliminando(true)
    setError('')
    try {
      await moviesService.eliminar(idEliminar)
      setPeliculas((actuales) => actuales.filter((p) => p.id !== idEliminar))
      setIdEliminar(null)
    } catch (err) {
      console.error(err)
      setError('No se pudo eliminar la película.')
    } finally {
      setEliminando(false)
    }
  }

  if (cargando) {
    return (
      <main className="movies-list" role="main">
        <Hero variant="skeleton" />
        {GENEROS.slice(0, 5).map((g) => (
          <MovieRow key={g} titulo={g} peliculas={[]} cargando={true} />
        ))}
      </main>
    )
  }

  return (
    <main className="movies-list" role="main">
      <div className="movies-list__hero-wrapper">
        <Hero pelicula={peliculaDestacada} />
      </div>

      <ErrorMessage mensaje={error} onDismiss={() => setError('')} />

      {termino && peliculasFiltradas.length === 0 && (
        <div className="movies-list__empty">
          <p>No se encontraron películas con "{termino}"</p>
          <button className="btn btn--ghost" onClick={() => { setTermino(''); manejarBusqueda('') }}>
            Limpiar búsqueda
          </button>
        </div>
      )}

      {!termino && peliculasFiltradas.length === 0 && (
        <div className="movies-list__empty">
          <p>Aún no hay películas cargadas.</p>
          <a href="/movies/new" className="btn btn--primary">Agregar la primera</a>
        </div>
      )}

      {termino ? (
        <section className="movies-list__search-results" aria-label={`Resultados para "${termino}"`}>
          <h2 className="movies-list__section-title">Resultados para "{termino}"</h2>
          <div className="movies-list__grid" role="list">
            {peliculasFiltradas.map((p) => (
              <MovieCard
                key={p.id}
                pelicula={p}
                onToggleFavorita={manejarToggleFavorita}
                deshabilitado={idToggleFavorita === p.id}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="movies-list__favorites" aria-label="Favoritas">
            <h2 className="movies-list__section-title">Tus favoritas</h2>
            <div className="movies-list__grid" role="list">
              {peliculasFiltradas.filter((p) => p.favorita).map((p) => (
                <MovieCard
                  key={p.id}
                  pelicula={p}
                  onToggleFavorita={manejarToggleFavorita}
                  deshabilitado={idToggleFavorita === p.id}
                />
              ))}
            </div>
          </section>
          {peliculasPorGenero.map(([genero, items]) => (
            <MovieRow
              key={genero}
              titulo={genero}
              peliculas={items}
              onToggleFavorita={manejarToggleFavorita}
              cargando={false}
            />
          ))}
        </>
      )}

      <ConfirmDialog
        abierto={Boolean(idEliminar)}
        titulo="Eliminar película"
        mensaje="¿Estás seguro de que querés eliminar esta película? Esta acción no se puede deshacer."
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setIdEliminar(null)}
      />

      {eliminando && <Loading mensaje="Eliminando…" size="sm" />}
    </main>
  )
}