export default function Loading({ mensaje = 'Cargando…', size = 'md' }) {
  const sizeClasses = {
    sm: 'loading--sm',
    md: 'loading--md',
    lg: 'loading--lg',
  }

  return (
    <div className={`loading ${sizeClasses[size]}`} role="status" aria-live="polite">
      <div className="loading__spinner" aria-hidden="true" />
      <p className="loading__text">{mensaje}</p>
    </div>
  )
}