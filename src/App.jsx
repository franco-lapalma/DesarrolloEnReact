import { useEffect } from 'react'
import app from './firebase/config'
import './App.css'

function App() {
  useEffect(() => {
    console.log('✅ Firebase conectado correctamente:', app.name)
    console.log('Project ID:', app.options.projectId)
  }, [])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🔥 Firebase + React</h1>
      <p>Revisá la consola del navegador (F12) para ver la confirmación de conexión</p>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <strong>Proyecto:</strong> {app.options.projectId}
      </div>
    </div>
  )
}

export default App