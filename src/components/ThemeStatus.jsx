import { useTheme } from '../context/useTheme'

export default function ThemeStatus() {
  const { theme } = useTheme()

  return (
    <section className="panel">
      <h2 className="panel__label">Lectura del contexto</h2>

      <pre className="readout">
        {'useTheme() → {\n  theme: '}
        <span className="k">{theme}</span>
        {',\n}\n\n// se refleja al instante\n// en todos los consumidores'}
      </pre>

      <p className="note">
        Este componente lee el tema directamente del contexto. Sin{' '}
        <strong>prop drilling</strong>: el estado viaja de{' '}
        <strong>ThemeProvider</strong> hasta acá sin pasar por cada nivel.
      </p>
    </section>
  )
}