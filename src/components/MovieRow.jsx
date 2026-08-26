import { useRef, useState } from 'react'
import { Icon } from './Icon'
import MovieCard from './MovieCard'
import Skeleton from './Skeleton'

export default function MovieRow({ titulo, peliculas, onToggleFavorita, cargando, skeletonCount = 6 }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeft(scrollLeft > 10)
      setShowRight(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  if (cargando) {
    return (
      <section className="movie-row" aria-label={titulo}>
        <div className="movie-row__header">
          <h2 className="movie-row__title">{titulo}</h2>
        </div>
        <div className="movie-row__scroller" role="list" aria-label={`${titulo}, cargando...`}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <MovieCard key={`skeleton-${i}`} variant="skeleton" />
          ))}
        </div>
      </section>
    )
  }

  if (!peliculas.length) {
    return null
  }

  return (
    <section className="movie-row" aria-label={titulo}>
      <div className="movie-row__header">
        <h2 className="movie-row__title">{titulo}</h2>
      </div>
      <div className="movie-row__viewport">
        <button
          className="movie-row__arrow movie-row__arrow--left"
          onClick={scrollLeft}
          aria-label={`Desplazar ${titulo} a la izquierda`}
          disabled={!showLeft}
          style={{ opacity: showLeft ? 1 : 0, pointerEvents: showLeft ? 'auto' : 'none' }}
        >
          <Icon name="chevronLeft" size={28} />
        </button>
        <div
          className="movie-row__scroller"
          ref={scrollRef}
          onScroll={handleScroll}
          role="list"
          aria-label={titulo}
        >
          {peliculas.map((p) => (
            <MovieCard
              key={p.id}
              pelicula={p}
              onToggleFavorita={onToggleFavorita}
            />
          ))}
        </div>
        <button
          className="movie-row__arrow movie-row__arrow--right"
          onClick={scrollRight}
          aria-label={`Desplazar ${titulo} a la derecha`}
          disabled={!showRight}
          style={{ opacity: showRight ? 1 : 0, pointerEvents: showRight ? 'auto' : 'none' }}
        >
          <Icon name="chevronRight" size={28} />
        </button>
      </div>
    </section>
  )
}