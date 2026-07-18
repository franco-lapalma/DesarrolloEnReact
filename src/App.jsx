import Usuarios from './components/Usuarios'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Directorio de Usuarios</h1>
        <p className="subtitle">Consumiendo API REST con <code>fetch</code>, <code>useState</code> y <code>useEffect</code></p>
      </header>
      <main>
        <Usuarios />
      </main>
      <footer className="app-footer">
        <p>Datos de <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a> · Construido con React + Vite</p>
      </footer>
    </div>
  )
}

export default App