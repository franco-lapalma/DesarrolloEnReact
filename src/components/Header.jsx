import { useTheme } from '../context/useTheme'

export default function Header() {
  const { theme } = useTheme()

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <circle cx="12" cy="12" r="8" fill="#ffc94d" />
            <circle cx="14.6" cy="9.6" r="3.2" fill="#0c1122" />
          </svg>
        </span>
        <span>
          <span className="brand-name">Diurna</span>
          <span className="brand-sub">contexto global</span>
        </span>
      </div>

      <span className="badge">
        <span className="badge__dot" />
        tema: {theme}
      </span>
    </header>
  )
}