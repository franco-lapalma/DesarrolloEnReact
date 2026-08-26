# 🎬 Mis películas favoritas — CineFilos

Aplicación web de tipo **CRUD** desarrollada con **React + Vite**, **React Router** y
**Firebase Firestore**. Permite gestionar una colección de películas favoritas:
visualizar, buscar, crear, editar, eliminar y marcar/desmarcar películas como
favoritas, además de acceder al detalle de cada una.

---

## ✨ Características

- **Listado** de películas con búsqueda por título (filtrado con `useMemo`).
- **Hero** destacado con la primera película favorita (póster + fondo).
- **Crear** una película nueva desde un formulario controlado.
- **Editar** una película existente (el formulario se precarga con sus datos).
- **Eliminar** películas con confirmación previa (`ConfirmDialog`).
- **Marcar / desmarcar** como favorita con una operación booleana en Firestore (`cambiarEstado`).
- **Detalle** de cada película en una ruta dinámica `/movies/:id`.
- **Login** sencillo (sección con formulario) y ruta **404**.
- **Estados de carga y error** en todas las operaciones asíncronas.
- **100% responsive** con navbar colapsable en mobile.
- **Footer** pegado al fondo (sticky).

---

## 🛠️ Stack técnico

- **React 18** + **Vite 5**
- **React Router 6** (BrowserRouter)
- **Firebase Firestore 10**
- **CSS** propio (tema oscuro estilo Netflix)

---

## 📁 Estructura del proyecto

```
src/
├── components/      # Navbar, MovieCard, Hero, SearchBar, Footer, etc.
├── views/           # MoviesListView, MovieDetailView, MovieFormView, LoginView, NotFoundView
├── services/        # moviesService.js (comunicación con Firestore)
├── validators/      # movieValidator.js (validación separada)
├── router/          # AppRouter.jsx (rutas con React Router)
├── context/         # AuthContext.jsx (login local con localStorage)
├── config/          # firebase.js (variables de entorno)
└── styles/          # index.css (estilos del tema)
scripts/
└── seed.mjs         # Carga 8 películas de ejemplo en Firestore
public/
├── posters/         # Pósters y fondos de las películas (locales)
└── movie.svg
```

---

## 🚀 Instalación y ejecución

### Requisitos
- Node.js 18 o superior
- Una cuenta de Google y un proyecto en [Firebase Console](https://console.firebase.google.com/)

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno.** Copiar `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   (En Windows: `copy .env.example .env`)

   Completar las variables con los datos del proyecto de Firebase:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
   > Los valores se obtienen en **Firebase Console → Configuración del proyecto →
   > General → Tus aplicaciones → Configuración del SDK**.

3. **Crear la base de datos en Firestore:**
   - Ir a *Firestore Database* y crear la base de datos en modo de prueba (o producción).
   - La colección `peliculas` **se crea automáticamente** al agregar el primer documento.

4. **Cargar datos de ejemplo (opcional pero recomendado):**
   - En Firebase Console ir a **Configuración del proyecto → Cuentas de servicio →
     Generar nueva clave privada**. Se descarga un archivo JSON.
   - En el `.env`, indicar la ruta a ese archivo en `FIREBASE_SERVICE_ACCOUNT_PATH`.
   - Ejecutar el script:
     ```bash
     npm run seed
     ```
   (Carga 8 películas de ejemplo y limpia la colección antes).

5. **Levantar la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir la URL que muestra Vite (por defecto http://localhost:5173).

6. **Para generar la versión de producción:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📋 Formato del documento en Firestore

Cada documento de la colección `peliculas` tiene esta forma:

```js
{
  titulo:   "El padrino",      // string  (obligatorio)
  anio:     1972,              // number  (obligatorio)
  genero:   "Drama",           // string  (obligatorio)
  rating:   4.5,               // number  0 a 5 (obligatorio)
  favorita: true,              // boolean
   posterUrl:  "data:image/...", // string  (opcional, imagen seleccionada desde el equipo)
   backdropUrl:"data:image/...", // string  (opcional, imagen seleccionada desde el equipo)
  sinopsis: "..."              // string  (opcional)
}
```

---

## 🔧 Correcciones visuales aplicadas

- **Fotos faltantes:** se reemplazó `via.placeholder.com` (fuera de servicio) por
  placeholders SVG en línea (`src/components/placeholders.js`). Los pósters de las
  películas se incluyen localmente en `public/posters/` para no depender de URLs externas.
- **Botones superpuestos:** el botón de favorita (corazón) se movió de abajo (donde
  se superponía al título/rating) a **arriba a la izquierda** del póster, siempre visible.
- **Navbar responsive:** se agregó botón de menú hamburguesa para mobile.
- **Footer sticky:** agregado al fondo con `flex-direction: column`.

### Imágenes seleccionadas desde la computadora

En el formulario se pueden seleccionar un póster y una imagen de fondo desde el
equipo mediante controles de tipo archivo. La aplicación convierte cada archivo
en una cadena `data:image/...` y la guarda en los campos `posterUrl` y
`backdropUrl` del documento de Firestore. Cada imagen debe pesar menos de 350 KB
para evitar superar el límite de tamaño de un documento de Firestore. Las
imágenes existentes almacenadas como URLs también siguen siendo compatibles.

---

## 📋 Requisitos de la consigna y su implementación

| Requisito | Implementación |
| --- | --- |
| **React + separación en componentes** | `components/` y `views/` separados. |
| **useState** | Estado de formularios, listados, carga y errores. |
| **useEffect** | Carga inicial de datos y carga de película para editar. |
| **useMemo** | Filtrado por búsqueda en `MoviesListView`. |
| **useRef** | Foco automático en el campo título del formulario y en el login. |
| **React Router** | `AppRouter` con `/`, `/movies`, `/movies/new`, `/movies/:id`, `/movies/:id/edit`, `/login` y `*` (404). |
| **Ruta dinámica** | `/movies/:id` para el detalle. |
| **Firebase Firestore** | `services/moviesService.js` con CRUD + `cambiarEstado`. |
| **Servicios separados** | Toda la lógica de Firestore vive en `services/`, fuera de los componentes. |
| **Variables de entorno** | `config/firebase.js` con `import.meta.env.VITE_*`. |
| **Formulario controlado** | `MovieFormView` con `useState`, limpia campos, valida y usa `useRef` para el foco. |
| **Validación separada** | `validators/movieValidator.js`. |
| **Búsqueda y filtrado** | `SearchBar` + `useMemo` en `MoviesListView`. |
| **Edición** | Ruta `/movies/:id/edit`, precarga datos y actualiza en Firestore. |
| **Eliminación** | `ConfirmDialog` antes de eliminar. |
| **Detalle** | `MovieDetailView` obtiene el `id` con `useParams`. |
| **Carga y errores** | Componentes `Loading` y `ErrorMessage` + estados en todas las vistas. |
