import React, { useState } from 'react'
import FormularioEventos from './components/FormularioEventos'
import FormularioHookForm from './components/FormularioHookForm'

export default function App() {
  const [vista, setVista] = useState('eventos')

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="header-title">Eventos en Formularios</h1>
          <p className="header-subtitle">Modulo 2 - Unidad 4 - Manejo de eventos en React</p>
        </div>
      </header>

      <nav className="tabs-nav">
        <div className="tabs-inner">
          <button
            className={`tab-btn ${vista === 'eventos' ? 'active' : ''}`}
            onClick={() => setVista('eventos')}
          >
            Formulario con Eventos Nativos
          </button>
          <button
            className={`tab-btn ${vista === 'hookform' ? 'active' : ''}`}
            onClick={() => setVista('hookform')}
          >
            Formulario con react-hook-form
          </button>
        </div>
      </nav>

      <main className="main-content">
        {vista === 'eventos' ? <FormularioEventos /> : <FormularioHookForm />}
      </main>

      <footer className="footer">
        Eventos en Formularios &mdash; React + Vite &mdash; Modulo 2, Unidad 4
      </footer>
    </div>
  )
}
