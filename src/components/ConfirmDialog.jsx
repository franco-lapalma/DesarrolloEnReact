import { Icon } from './Icon'

export default function ConfirmDialog({ abierto, titulo, mensaje, onConfirmar, onCancelar, variant = 'danger' }) {
  if (!abierto) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onCancelar}
          aria-label="Cerrar diálogo"
        >
          <Icon name="x" size={24} />
        </button>
        <div className="modal__content">
          <h2 id="modal-titulo" className="modal__title">{titulo}</h2>
          <p className="modal__message">{mensaje}</p>
          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`btn btn--primary ${variant === 'danger' ? 'btn--danger' : ''}`}
              onClick={onConfirmar}
              autoFocus
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}