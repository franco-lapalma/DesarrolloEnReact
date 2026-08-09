import { useState } from 'react'
import { actualizarProductoMerge, actualizarProducto } from '../firebase/crud'

export const ProductoUpdate = () => {
  const [id, setId] = useState('')
  const [campo, setCampo] = useState('precio')
  const [valor, setValor] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const handleUpdateMerge = async (e) => {
    e.preventDefault()
    if (!id || !valor) {
      setMensaje('Complete ID y valor')
      setTipoMensaje('error')
      return
    }

    setLoading(true)
    try {
      const datos = { [campo]: isNaN(valor) ? valor : Number(valor) }
      await actualizarProductoMerge(id, datos)
      setMensaje(`Campo "${campo}" actualizado con merge: true`)
      setTipoMensaje('success')
      setValor('')
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDoc = async (e) => {
    e.preventDefault()
    if (!id || !valor) {
      setMensaje('Complete ID y valor')
      setTipoMensaje('error')
      return
    }

    setLoading(true)
    try {
      const datos = { [campo]: isNaN(valor) ? valor : Number(valor) }
      await actualizarProducto(id, datos)
      setMensaje(`Campo "${campo}" actualizado con updateDoc`)
      setTipoMensaje('success')
      setValor('')
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Actualizar Productos</h2>
      
      <form onSubmit={handleUpdateMerge} className="form-group">
        <h3>Con setDoc + merge: true</h3>
        <div className="input-group">
          <label>ID del producto: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ej: producto001"
            required
          />
        </div>
        <div className="input-group">
          <label>Campo a actualizar: </label>
          <select value={campo} onChange={(e) => setCampo(e.target.value)}>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="stock">Stock</option>
          </select>
        </div>
        <div className="input-group">
          <label>Nuevo valor: </label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Nuevo valor"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar (merge)'}
        </button>
      </form>

      <hr />

      <form onSubmit={handleUpdateDoc} className="form-group">
        <h3>Con updateDoc</h3>
        <div className="input-group">
          <label>ID del producto: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ej: producto001"
            required
          />
        </div>
        <div className="input-group">
          <label>Campo a actualizar: </label>
          <select value={campo} onChange={(e) => setCampo(e.target.value)}>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="stock">Stock</option>
          </select>
        </div>
        <div className="input-group">
          <label>Nuevo valor: </label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Nuevo valor"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar (updateDoc)'}
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