const FLOW = [
  { role: 'provider', name: 'ThemeProvider', note: 'estado + useMemo' },
  { role: 'consumer', name: 'Header', note: 'useTheme()' },
  { role: 'consumer', name: 'ThemeStatus', note: 'useTheme()' },
  { role: 'consumer', name: 'ThemeToggle', note: 'toggleTheme()' },
]

export default function FlowDiagram() {
  return (
    <section className="panel">
      <h2 className="panel__label">Circuito del estado</h2>

      <div className="flow">
        {FLOW.map((node) => (
          <div
            key={node.name}
            className={`flow__node flow__node--${node.role}`}
          >
            <span>
              {node.role === 'provider' ? '◈' : '▸'} {node.name}
            </span>
            <span className="tag">{node.note}</span>
          </div>
        ))}
      </div>
    </section>
  )
}