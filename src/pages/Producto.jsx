import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Datos simulados de productos
const productos = {
  1: { nombre: 'Laptop Gamer Pro', precio: '$1.200.000', descripcion: 'Procesador i7, 16GB RAM, RTX 4060, 512GB SSD.' },
  2: { nombre: 'Monitor UltraWide 34"', precio: '$450.000', descripcion: 'Resolucion 3440x1440, 144Hz, panel IPS.' },
  3: { nombre: 'Teclado Mecanico RGB', precio: '$85.000', descripcion: 'Switches Cherry MX Red, iluminacion RGB por tecla.' },
  42: { nombre: 'Mouse Inalambrico Elite', precio: '$65.000', descripcion: 'Sensor 25.600 DPI, 70 horas de bateria, peso 63g.' },
  7: { nombre: 'Auriculares Noise Cancelling', precio: '$120.000', descripcion: 'Cancelacion de ruido activa, 30hs de bateria, Bluetooth 5.3.' },
  99: { nombre: 'Webcam 4K', precio: '$95.000', descripcion: 'Resolucion 4K, enfoque automatico, microfono dual.' },
}

export default function Producto() {
  // useParams - lee el parametro dinamico :id de la URL
  const { id } = useParams()
  const navigate = useNavigate()
  const [contador, setContador] = useState(1)

  const producto = productos[id]

  // Navegacion imperativa al producto anterior/siguiente
  const irAlSiguiente = () => {
    const nextId = Number(id) + 1
    navigate(`/producto/${nextId}`)
  }
  const irAlAnterior = () => {
    const prevId = Math.max(1, Number(id) - 1)
    navigate(`/producto/${prevId}`)
  }

  return (
    <div className="page-container">
      <div className="highlight-box">
        <h3>Parametro de ruta (useParams)</h3>
        <p>
          La URL actual es: <code>/producto/{id}</code><br />
          El valor de <code>useParams().id</code> es: <strong>{id}</strong>
        </p>
      </div>

      {producto ? (
        <div className="card product-card">
          <div className="product-badge">ID: {id}</div>
          <h2>{producto.nombre}</h2>
          <p className="product-price">{producto.precio}</p>
          <p>{producto.descripcion}</p>
          <div className="btn-group">
            <button onClick={irAlAnterior} className="btn-secondary">
              &larr; Anterior
            </button>
            <button onClick={irAlSiguiente} className="btn-secondary">
              Siguiente &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2>Producto #{id} no encontrado</h2>
          <p>
            El producto con ID <strong>{id}</strong> no existe en nuestros datos.
            Probá con los IDs: 1, 2, 3, 7, 42 o 99.
          </p>
          <div className="btn-group">
            <button onClick={() => navigate('/producto/1')} className="btn-primary">
              Ver Producto #1
            </button>
            <button onClick={() => navigate('/producto/42')} className="btn-primary">
              Ver Producto #42
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Navegacion imperativa con useNavigate</h3>
        <p>
          Los botones de arriba usan <code>useNavigate()</code> para cambiar
          de producto sin necesidad de hacer clic en un enlace.
        </p>
        <p>
          Contador de estado local:{' '}
          <strong>{contador}</strong>
        </p>
        <button onClick={() => setContador(c => c + 1)} className="btn-secondary">
          Incrementar contador
        </button>
      </div>

      <Link to="/" className="back-link">&larr; Volver al inicio</Link>
    </div>
  )
}