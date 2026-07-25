import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="highlight-box success">
        <h3>Ruta protegida - Acceso concedido</h3>
        <p>
          Esta pagina solo es visible para usuarios autenticados.
          Si intentabas acceder sin estar logueado, fuiste redirigido al login
          y luego de autenticarte se te trajo de vuelta aqui automaticamente
          gracias a <code>useLocation()</code> y <code>Navigate</code>.
        </p>
        <p>
          Usuario actual: <strong>{user.username}</strong>
        </p>
      </div>

      <div className="card-grid">
        <div className="card stat-card">
          <h3>Usuarios activos</h3>
          <p className="stat-number">1.284</p>
          <p className="stat-label">+12% esta semana</p>
        </div>
        <div className="card stat-card">
          <h3>Ventas del mes</h3>
          <p className="stat-number">$847.300</p>
          <p className="stat-label">+8% vs mes anterior</p>
        </div>
        <div className="card stat-card">
          <h3>Mensajes nuevos</h3>
          <p className="stat-number">56</p>
          <p className="stat-label">Sin leer</p>
        </div>
      </div>

      <div className="card">
        <h3>Actividad reciente</h3>
        <ul className="activity-list">
          <li><strong>Nuevo usuario registrado</strong> - hace 5 minutos</li>
          <li><strong>Pedido #1042 completado</strong> - hace 23 minutos</li>
          <li><strong>Consulta de soporte respondida</strong> - hace 1 hora</li>
          <li><strong>Producto actualizado</strong> - hace 2 horas</li>
        </ul>
      </div>

      <Link to="/" className="back-link">&larr; Volver al inicio</Link>
    </div>
  )
}