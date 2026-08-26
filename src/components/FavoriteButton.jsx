import { Icon } from './Icon'

export default function FavoriteButton({ favorita, onToggle, deshabilitado, size = 'md', showLabel = true }) {
  const sizeClasses = {
    sm: 'btn-icon--sm',
    md: 'btn-icon--md',
    lg: 'btn-icon--lg',
  }

  return (
    <button
      type="button"
      className={`btn-icon ${favorita ? 'btn-icon--active' : ''} ${sizeClasses[size]}`}
      onClick={onToggle}
      disabled={deshabilitado}
      aria-pressed={favorita}
      aria-label={favorita ? 'Quitar de favoritas' : 'Agregar a favoritas'}
    >
      {favorita ? <Icon name="heart" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} /> : <Icon name="heartOutline" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {showLabel && <span className="btn-icon__label">{favorita ? 'Favorita' : 'Mi lista'}</span>}
    </button>
  )
}