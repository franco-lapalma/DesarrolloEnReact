import { useState } from 'react'
import { eliminarProducto } from '../firebase/crud'

export const ProductoDelete = ({ onSuccess }) => {
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!id.trim()) {
      setMensaje('Ingrese un ID')
      setTipoMensaje('error')
      return
    }

    if (!window.confirm(`¿Está seguro de eliminar el producto "${id}"?`)) {
      return
    }

    setLoading(true)
    try {
      await eliminarProducto(id.trim())
      setMensaje(`Producto "${id}" eliminado correctamente`)
      setTipoMensaje('success')
      setId('')
      onSuccess?.()
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Eliminar Producto</h2>
      
      <form onSubmit={handleDelete} className="form-group">
        <div className="input-group">
          <label>ID del producto a eliminar: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ej: producto001"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-danger">
          {loading ? 'Eliminando...' : 'Eliminar Producto'}
        </button>
      </form>

      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}
    </div>
  )
}