import { useTheme } from '../context/useTheme'

const STARS = [
  [12, 20],
  [24, 36],
  [38, 12],
  [50, 28],
  [64, 16],
  [78, 42],
  [88, 20],
  [14, 62],
  [30, 78],
  [48, 66],
  [66, 74],
  [82, 58],
  [6, 44],
  [74, 6],
]

export default function Hero() {
  const { theme } = useTheme()

  return (
    <section className="hero">
      <div className="clouds" aria-hidden="true">
        <span style={{ top: '56%', left: '8%' }} />
        <span style={{ top: '66%', right: '6%', width: '110px' }} />
        <span style={{ top: '30%', right: '16%', width: '90px', height: '30px' }} />
      </div>

      <div className="stars" aria-hidden="true">
        {STARS.map(([left, top], i) => (
          <i
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="orb" aria-hidden="true">
        <span className="orb__rays" />
        <span className="orb__disc" />
      </div>

      <span className="chip">{theme === 'light' ? 'amanecer' : 'noche'}</span>

      <p className="hero__kicker">React · Context API · Unidad 3</p>

      <h1 className="hero__title">
        El día y la noche <em>en un solo estado</em>
      </h1>

      <p className="hero__copy">
        Diurna comparte el tema claro/oscuro por toda la app con{' '}
        <code>ThemeProvider</code> y lo consume con <code>useTheme()</code>, sin
        perforar props por cada nivel del árbol.
      </p>

      <p className="hero__hint">Poné el cielo en marcha con el interruptor ↓</p>
    </section>
  )
}