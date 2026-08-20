import Header from './components/Header'
import Hero from './components/Hero'
import ThemeStatus from './components/ThemeStatus'
import FlowDiagram from './components/FlowDiagram'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />

      <div className="grid">
        <ThemeStatus />
        <FlowDiagram />
      </div>

      <ThemeToggle />

      <p className="app-footer">
        Context API · React Avanzado · Módulo 3 · Unidad 3
      </p>
    </div>
  )
}

export default App