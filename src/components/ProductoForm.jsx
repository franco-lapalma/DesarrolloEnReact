import { useState } from 'react'
import { crearProductoAutoId, crearProductoConId } from '../firebase/crud'

export const ProductoForm = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [idPersonalizado, setIdPersonalizado] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  const handleSubmitAutoId = async (e) => {
    e.preventDefault()
    if (!nombre || !precio || !stock) {
      setMensaje('Complete todos los campos')
      setTipoMensaje('error')
      return
    }

    setLoading(true)
    try {
      const producto = {
        nombre,
        precio: Number(precio),
        stock: Number(stock)
      }
      await crearProductoAutoId(producto)
      setMensaje('Producto creado con ID automático')
      setTipoMensaje('success')
      setNombre('')
      setPrecio('')
      setStock('')
      onSuccess?.()
    } catch (error) {
      setMensaje(`Error: ${error.message}`)
      setTipoMensaje('error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitConId = async (e) => {
    e.preventDefault()
    if (!idPersonalizado || !nombre || !precio || !stock) {
      setMensaje('Complete todos los campos incluyendo el ID')
      setTipoMensaje('error')
      return
    }

    setLoading(true)
    try {
      const producto = {
        nombre,
        precio: Number(precio),
        stock: Number(stock)
      }
      await crearProductoConId(idPersonalizado, producto)
      setMensaje(`Producto creado con ID: ${idPersonalizado}`)
      setTipoMensaje('success')
      setIdPersonalizado('')
      setNombre('')
      setPrecio('')
      setStock('')
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
      <h2>Insertar Productos</h2>
      
      <form onSubmit={handleSubmitAutoId} className="form-group">
        <h3>Con ID Automático (addDoc)</h3>
        <div className="input-group">
          <label>Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="input-group">
          <label>Precio: </label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="input-group">
          <label>Stock: </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear con ID Automático'}
        </button>
      </form>

      <hr />

      <form onSubmit={handleSubmitConId} className="form-group">
        <h3>Con ID Definido (setDoc)</h3>
        <div className="input-group">
          <label>ID Personalizado: </label>
          <input
            type="text"
            value={idPersonalizado}
            onChange={(e) => setIdPersonalizado(e.target.value)}
            placeholder="ej: producto001"
            required
          />
        </div>
        <div className="input-group">
          <label>Nombre: </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="input-group">
          <label>Precio: </label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="input-group">
          <label>Stock: </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear con ID Definido'}
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