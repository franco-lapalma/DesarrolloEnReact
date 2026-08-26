import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION = 'peliculas'
const FIRESTORE_TIMEOUT_MS = 10000

function assertDbReady() {
  if (!db) {
    throw new Error('Firebase Firestore no está inicializado. Revisá tu archivo .env y activá Firestore en Firebase Console.')
  }
}

export async function obtenerTodas() {
  assertDbReady()
  const q = query(collection(db, COLLECTION), orderBy('titulo'))
  const snapshot = await Promise.race([
    getDocs(q),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('La consulta de películas superó el tiempo de espera.')), FIRESTORE_TIMEOUT_MS)
    }),
  ])
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function obtenerPorId(id) {
  assertDbReady()
  const docRef = doc(db, COLLECTION, id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) {
    return null
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export async function crear(pelicula) {
  assertDbReady()
  const docRef = await addDoc(collection(db, COLLECTION), pelicula)
  return {
    id: docRef.id,
    ...pelicula,
  }
}

export async function actualizar(id, pelicula) {
  assertDbReady()
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, pelicula)
  return {
    id,
    ...pelicula,
  }
}

export async function eliminar(id) {
  assertDbReady()
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
  return id
}

export async function cambiarEstado(id, estado) {
  assertDbReady()
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { favorita: estado })
  return { id, favorita: estado }
}