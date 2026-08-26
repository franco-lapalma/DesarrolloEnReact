import { Icon } from './Icon'

export default function ErrorMessage({ mensaje, onDismiss }) {
  if (!mensaje) return null

  return (
    <div className="error" role="alert">
      <Icon name="info" size={20} aria-hidden />
      <span>{mensaje}</span>
      {onDismiss && (
        <button type="button" className="error__dismiss" onClick={onDismiss} aria-label="Cerrar">
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  )
}