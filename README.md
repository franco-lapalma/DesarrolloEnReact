# Firebase + React Integration

Proyecto de ejemplo que demuestra la integración completa de Firebase en una aplicación React usando Vite, siguiendo buenas prácticas de seguridad y arquitectura.

## 📋 Descripción

Este proyecto implementa la conexión entre Firebase y React aplicando:
- Variables de entorno para proteger credenciales
- Inicialización singleton de Firebase (una sola instancia)
- Importación selectiva de módulos (solo lo necesario)
- Estructura de archivos organizada y escalable

## 🚀 Pasos de Integración Realizados

### 1. Firebase Console
- Creado proyecto `mi-primer-proyecto-f956f`
- Añadida aplicación web
- Obtenido objeto `firebaseConfig` con claves de API

### 2. Proyecto React (Vite)
```bash
npm create vite@latest firebase-react-app -- --template react
cd firebase-react-app
npm install
npm install firebase
```

### 3. Configuración con Variables de Entorno
Creado `.env.local` (no se sube a Git):
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 4. Archivo de Configuración (`src/firebase/config.js`)
- Inicialización singleton con `getApps()`
- Exporta solo `auth` y `db` (Firestore)
- Usa `import.meta.env` para acceder a variables de entorno

## 🛠️ Instalación y Ejecución

```bash
# Clonar repositorio
git clone <url-del-repo>
cd firebase-react-app

# Instalar dependencias
npm install

# Crear archivo .env.local con tus credenciales de Firebase
cp .env.example .env.local
# Editar .env.local con tus valores

# Ejecutar en desarrollo
npm run dev
```

Abrir `http://localhost:5173` y verificar en **Consola del navegador (F12)**:
```
✅ Firebase conectado correctamente: [DEFAULT]
Project ID: mi-primer-proyecto-f956f
```

## 📁 Estructura del Proyecto

```
src/
├── firebase/
│   └── config.js      # Configuración e inicialización de Firebase
├── App.jsx            # Componente principal con test de conexión
├── App.css            # Estilos mínimos
├── main.jsx           # Entry point
└── index.css          # Estilos globales
```

## ⚠️ Problemas Comunes y Soluciones

| Problema | Solución |
|----------|----------|
| Variables de entorno `undefined` | Reiniciar servidor de Vite tras crear/modificar `.env.local` |
| Error "Firebase App named '[DEFAULT]' already exists" | Usar patrón singleton con `getApps().length === 0` |
| Módulos no encontrados | Verificar imports: `firebase/app`, `firebase/auth`, `firebase/firestore` |
| CORS / permisos | Configurar dominios autorizados en Firebase Console > Authentication > Settings |

## 🔐 Buenas Prácticas Aplicadas

1. **Variables de entorno**: Claves fuera del código fuente (`.env.local` en `.gitignore`)
2. **Singleton**: `getApps()` evita múltiples inicializaciones en Hot Module Replacement
3. **Imports selectivos**: Solo `initializeApp`, `getApps`, `getAuth`, `getFirestore`
4. **Separación de responsabilidades**: Config en `src/firebase/config.js`

## 📸 Capturas de Verificación

![alt text](image.png)
## 👨‍💻 Créditos

**Autor**: Franco  
**Curso**: Diplomatura - Módulo 3  
**Unidad**: 1 - Conectando mi primera app React con Firebase

## 📚 Fuentes y Bibliografía

- [Firebase - Agregar Firebase a proyecto JavaScript](https://firebase.google.com/docs/web/setup)
- [Vite - Variables de Entorno y Modos](https://vitejs.dev/guide/env-and-mode.html)
- Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2ª ed. O'Reilly Media; 2020.
- Gupta, S. *Getting Started with Firebase*. 1ª ed. Packt Publishing; 2017.