import { Link, useNavigate } from 'react-router-dom'

export default function Inicio() {
  // useNavigate - navegacion imperativa
  const navigate = useNavigate()

  const handleClick = () => {
    // Navega al producto con id 42 usando navegacion programatica
    navigate('/producto/42')
  }

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="page-container">
      <h1>Bienvenido al Mini Dashboard</h1>

      <p className="page-description">
        Este proyecto demuestra el uso de React Router v6 con rutas publicas,
        protegidas, dinamicas, query params, navegacion declarativa e imperativa,
        y rutas anidadas con Outlet.
      </p>

      <div className="card-grid">
        <div className="card">
          <h3>Rutas estaticas</h3>
          <p>Navegacion con &lt;Link&gt; y &lt;NavLink&gt; entre paginas fijas.</p>
          <Link to="/nosotros" className="card-link">Ir a Nosotros &rarr;</Link>
        </div>

        <div className="card">
          <h3>Ruta dinamica</h3>
          <p>Usa useParams para leer el :id de la URL.</p>
          <Link to="/producto/7" className="card-link">Ver Producto #7 &rarr;</Link>
        </div>

        <div className="card">
          <h3>Query Params</h3>
          <p>Usa useSearchParams para leer parametros de consulta.</p>
          <Link to="/contacto?categoria=soporte&tema=consultas" className="card-link">
            Ir a Contacto &rarr;
          </Link>
        </div>

        <div className="card">
          <h3>Ruta protegida</h3>
          <p>Requiere autenticacion simulada para acceder.</p>
          <button onClick={handleGoToDashboard} className="card-btn">
            Ir al Dashboard &rarr;
          </button>
        </div>
      </div>

      <div className="highlight-box">
        <h3>Ejemplo de navegacion imperativa (useNavigate)</h3>
        <p>
          El boton de abajo usa <code>useNavigate()</code> para redirigir al
          usuario programaticamente al Producto #42, sin necesidad de un enlace.
        </p>
        <button onClick={handleClick} className="btn-primary">
          Navegar a Producto #42 (useNavigate)
        </button>
      </div>
    </div>
  )
}