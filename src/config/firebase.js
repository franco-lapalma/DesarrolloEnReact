import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const normalizarEnv = (valor) => {
  if (typeof valor !== 'string') return ''
  return valor.trim().replace(/,$/, '').replace(/^['"]+|['"]+$/g, '').trim()
}

const firebaseConfig = {
  apiKey: normalizarEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: normalizarEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: normalizarEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: normalizarEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: normalizarEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: normalizarEnv(import.meta.env.VITE_FIREBASE_APP_ID),
}

const camposFaltantes = Object.entries(firebaseConfig)
  .filter(([, valor]) => !valor)
  .map(([clave]) => clave)

export const configuracionCompleta = camposFaltantes.length === 0
export const variablesFaltantes = camposFaltantes

export const app = configuracionCompleta ? initializeApp(firebaseConfig) : null
export const db = configuracionCompleta ? getFirestore(app) : null