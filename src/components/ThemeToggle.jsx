import { useTheme } from '../context/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section className="panel switch-panel">
      <h2 className="panel__label">Acción · alternar tema</h2>

      <div className="switch-wrap">
        <button
          type="button"
          className="switch"
          role="switch"
          aria-checked={dark}
          aria-label="Cambiar entre tema claro y oscuro"
          onClick={toggleTheme}
        >
          <span className="switch__knob" />
          <span className="switch__icons" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle cx="12" cy="12" r="5" fill="#fff1cf" />
              <path
                d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                stroke="#fff1cf"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M15 4a7.5 7.5 0 1 0 5 13A8.5 8.5 0 0 1 15 4Z" fill="#ffc94d" />
            </svg>
          </span>
        </button>

        <p className="switch-hint">
          Ahora es <strong>{dark ? 'noche' : 'amanecer'}</strong> · tocar para
          {dark ? ' volver al día' : ' pasar a la noche'}
        </p>
      </div>
    </section>
  )
}