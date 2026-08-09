import { useState } from 'react'
import { useProductos } from '../hooks/useProductos'
import { obtenerProductoPorId } from '../firebase/crud'

export const ProductoList = () => {
  const { productos, loading, error } = useProductos()
  const [productoIndividual, setProductoIndividual] = useState(null)
  const [buscarId, setBuscarId] = useState('')
  const [loadingIndividual, setLoadingIndividual] = useState(false)
  const [errorIndividual, setErrorIndividual] = useState('')

  const handleBuscarPorId = async () => {
    if (!buscarId.trim()) return
    setLoadingIndividual(true)
    setErrorIndividual('')
    try {
      const producto = await obtenerProductoPorId(buscarId.trim())
      setProductoIndividual(producto)
      if (!producto) {
        setErrorIndividual('Producto no encontrado')
      }
    } catch (err) {
      setErrorIndividual(`Error: ${err.message}`)
    } finally {
      setLoadingIndividual(false)
    }
  }

  if (loading) return <div className="card">Cargando productos...</div>
  if (error) return <div className="card error">Error: {error}</div>

  return (
    <div className="card">
      <h2>Lista de Productos (Tiempo Real con onSnapshot)</h2>
      
      <div className="buscar-individual">
        <h3>Buscar por ID (getDoc)</h3>
        <div className="input-group inline">
          <input
            type="text"
            value={buscarId}
            onChange={(e) => setBuscarId(e.target.value)}
            placeholder="ID del producto"
          />
          <button onClick={handleBuscarPorId} disabled={loadingIndividual}>
            {loadingIndividual ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {errorIndividual && <div className="mensaje error">{errorIndividual}</div>}
        {productoIndividual && (
          <div className="producto-detalle">
            <h4>Producto encontrado:</h4>
            <pre>{JSON.stringify(productoIndividual, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p className="vacio">No hay productos. Agregue alguno arriba.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <h4>{producto.nombre}</h4>
              <p><strong>ID:</strong> {producto.id}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
              {producto.creadoEn && <p><small>Creado: {new Date(producto.creadoEn).toLocaleString()}</small></p>}
              {producto.actualizadoEn && <p><small>Actualizado: {new Date(producto.actualizadoEn).toLocaleString()}</small></p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}