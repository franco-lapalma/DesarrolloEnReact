import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Producto from './pages/Producto'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas anidadas dentro del Layout (Navbar fija + Outlet) */}
          <Route path="/" element={<Layout />}>  
            {/* Ruta publica estatica */}
            <Route index element={<Inicio />} />
            {/* Ruta publica estatica */}
            <Route path="nosotros" element={<Nosotros />} />
            {/* Ruta publica con query params */}
            <Route path="contacto" element={<Contacto />} />
            {/* Ruta dinamica con parametro :id */}
            <Route path="producto/:id" element={<Producto />} />
            {/* Ruta protegida - requiere login */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Ruta de login */}
            <Route path="login" element={<Login />} />
            {/* Ruta 404 */}
            <Route path="*" element={
              <div className="page-container">
                <h1>404 - Pagina no encontrada</h1>
                <p>La ruta que buscas no existe.</p>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}