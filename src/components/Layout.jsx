import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        Mini Dashboard - React Router v6 - Modulo 2, Unidad 3
      </footer>
    </div>
  )
}