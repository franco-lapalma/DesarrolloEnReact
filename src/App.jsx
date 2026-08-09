import { useState } from 'react'
import { AuthProvider, AuthButtons } from './components/AuthComponent'
import { ProductoForm } from './components/ProductoForm'
import { ProductoList } from './components/ProductoList'
import { ProductoUpdate } from './components/ProductoUpdate'
import { ProductoDelete } from './components/ProductoDelete'
import './App.css'

const tabs = [
  { id: 'crear', label: '➕ Crear', component: ProductoForm },
  { id: 'leer', label: '📋 Leer', component: ProductoList },
  { id: 'actualizar', label: '✏️ Actualizar', component: ProductoUpdate },
  { id: 'eliminar', label: '🗑️ Eliminar', component: ProductoDelete },
]

function AppContent() {
  const [activeTab, setActiveTab] = useState('crear')
  const [refreshKey, setRefreshKey] = useState(0)

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ProductoForm

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>🔥 Firestore CRUD</h1>
          <span className="subtitle">Módulo 3 - Unidad 2</span>
        </div>
        <AuthButtons />
      </header>

      <nav className="tab-nav" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        <ActiveComponent 
          key={refreshKey} 
          onSuccess={() => setRefreshKey(k => k + 1)} 
        />
      </main>

      <footer>
        <p>Diplomatura - Módulo 3 - Unidad 2 | Firebase Firestore CRUD</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App