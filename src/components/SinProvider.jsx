import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

export default function SinProvider() {
  const value = useContext(ThemeContext)

  return (
    <footer className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">
          experimento · consumo fuera del provider
        </span>
      </div>

      <div className="terminal__body">
        <p>
          <span className="prompt">$</span> useContext(ThemeContext) fuera de{' '}
          ThemeProvider
        </p>
        <p>
          <span className="prompt">→</span>{' '}
          <span className="out">
            {value === undefined ? 'undefined' : JSON.stringify(value)}
          </span>
        </p>
        <p className="dim">// React devuelve el valor por defecto del contexto.</p>
        <p className="dim">
          // Si en cambio se usa useTheme(), lanza un error claro.
        </p>
      </div>
    </footer>
  )
}