import { useState, useEffect } from 'react'
import { suscribirseProductos, obtenerTodosProductos } from '../firebase/crud'

export const useProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarInicial = async () => {
      try {
        setLoading(true)
        const data = await obtenerTodosProductos()
        setProductos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarInicial()

    const unsubscribe = suscribirseProductos((nuevosProductos) => {
      setProductos(nuevosProductos)
    })

    return () => unsubscribe()
  }, [])

  return { productos, loading, error }
}

export const useProducto = (id) => {
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const cargarProducto = async () => {
      try {
        setLoading(true)
        const { obtenerProductoPorId } = await import('../firebase/crud')
        const data = await obtenerProductoPorId(id)
        setProducto(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarProducto()
  }, [id])

  return { producto, loading, error }
}