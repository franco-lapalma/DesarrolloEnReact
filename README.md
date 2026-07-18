# Listado de Usuarios - API REST en React

## Descripción
Aplicación React (Vite) que consume la API pública **JSONPlaceholder** para obtener y mostrar un listado de usuarios. Implementa manejo de estados (loading, error, data), renderizado condicional, búsqueda por nombre, botón de recarga y componente hijo para tarjetas de usuario.

## Tecnologías
- React 18 + Vite
- Fetch API (async/await)
- Hooks: `useState`, `useEffect`
- CSS Modules / CSS global

## Estructura del proyecto
```
src/
├── components/
│   ├── Usuarios.jsx       # Componente principal: fetch, estados, filtro
│   ├── UsuarioCard.jsx    # Componente hijo: tarjeta de usuario
│   ├── Buscador.jsx       # Componente hijo: input de búsqueda
│   └── *.css              # Estilos por componente
├── App.jsx                # Componente raíz
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales
```

## Instrucciones de instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd usuarios-api

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Capturas de pantalla

### 1. Estado de carga
![alt text](/docs/captura.png)
*Muestra "Cargando usuarios..." mientras se realiza la petición fetch.*

### 2. Estado de error
![alt text](/docs/captura1.png)
*Muestra mensaje de error y botón "Reintentar" si la API falla o no responde.*

### 3. Estado con datos
![alt text](/docs/captura2.png)
*Lista de usuarios con tarjetas (nombre, email, teléfono, web, empresa, dirección), barra de búsqueda y botón recargar.*

> **Nota:** Las capturas se encuentran en la carpeta `docs/`.

## Créditos
- **Autor:** Franco
- **Curso:** Diplomatura en Desarrollo Web
- **Módulo:** 2 - Unidad 2
- **Año:** 2026

## Fuentes y bibliografía
- Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2ª ed. O'Reilly Media; 2020.
- Flanagan, D. *JavaScript: The Definitive Guide*. 7ª ed. O'Reilly Media; 2020.
- MDN Web Docs. *Window: fetch() method*. https://developer.mozilla.org/en-US/docs/Web/API/fetch
- React. *useState Hook*. https://react.dev/reference/react/useState
- React. *useEffect Hook*. https://react.dev/reference/react/useEffect
- JSONPlaceholder. *Free fake API for testing*. https://jsonplaceholder.typicode.com/users

## Licencia
Proyecto educativo - Libre uso académico.
