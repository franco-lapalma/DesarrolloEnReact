import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query
} from 'firebase/firestore'
import { db } from './config'

const COLLECTION_NAME = 'productos'

export const productosCollection = collection(db, COLLECTION_NAME)

export const crearProductoAutoId = async (producto) => {
  try {
    const docRef = await addDoc(productosCollection, {
      ...producto,
      creadoEn: new Date().toISOString()
    })
    return { id: docRef.id, ...producto }
  } catch (error) {
    console.error('Error al crear producto con ID automático:', error)
    throw error
  }
}

export const crearProductoConId = async (id, producto) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await setDoc(docRef, {
      ...producto,
      creadoEn: new Date().toISOString()
    })
    return { id, ...producto }
  } catch (error) {
    console.error('Error al crear producto con ID definido:', error)
    throw error
  }
}

export const obtenerTodosProductos = async () => {
  try {
    const snapshot = await getDocs(productosCollection)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error al obtener todos los productos:', error)
    throw error
  }
}

export const obtenerProductoPorId = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }
    }
    return null
  } catch (error) {
    console.error('Error al obtener producto por ID:', error)
    throw error
  }
}

export const suscribirseProductos = (callback) => {
  const q = query(productosCollection)
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    callback(productos)
  }, (error) => {
    console.error('Error en suscripción tiempo real:', error)
  })
  return unsubscribe
}

export const actualizarProductoMerge = async (id, datos) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await setDoc(docRef, {
      ...datos,
      actualizadoEn: new Date().toISOString()
    }, { merge: true })
    return { id, ...datos }
  } catch (error) {
    console.error('Error al actualizar con merge:', error)
    throw error
  }
}

export const actualizarProducto = async (id, datos) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...datos,
      actualizadoEn: new Date().toISOString()
    })
    return { id, ...datos }
  } catch (error) {
    console.error('Error al actualizar con updateDoc:', error)
    throw error
  }
}

export const eliminarProducto = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
    return id
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}