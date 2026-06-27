# Formulario Interactivo con Validación en Clases

## Descripción y Objetivos

Este proyecto implementa un gestor de tareas utilizando JavaScript moderno (ES6+), practicando:

- **Clases** con propiedades y métodos (`Tarea`, `GestorTareas`)
- **Asincronía** con `Promise`, `setTimeout`, `async/await` y `Promise.all`
- **Métodos de array**: `forEach`, `find`, `filter`, `map`
- Manipulación de datos y simulación de carga de datos

## Instrucciones de Instalación y Ejecución

### Requisitos
- Node.js (versión 14 o superior) o un navegador moderno

### Ejecución con Node.js
```bash
node tareas.js
```

### Ejecución en navegador
1. Crear un archivo `index.html` básico
2. Incluir el script: `<script src="tareas.js"></script>`
3. Abrir en el navegador y ver la consola (F12)

## Capturas de Pantalla de la Consola

```
Cargando tareas iniciales...

✅ Tareas cargadas correctamente
👥 Usuarios cargados: Franco, Usuario Demo

📋 Lista de tareas:
1. [ ] Aprender JavaScript avanzado (ID: 1)
2. [ ] Practicar clases y promesas (ID: 2)
3. [ ] Entregar ejercicio formativo (ID: 3)

➕ Agregando nueva tarea...
Lista actualizada:
1. [ ] Aprender JavaScript avanzado (ID: 1)
2. [ ] Practicar clases y promesas (ID: 2)
3. [ ] Entregar ejercicio formativo (ID: 3)
4. [ ] Revisar criterios de evaluación (ID: 1703123456789)

✅ Tareas completadas:
(ninguna tarea completada aún)

🔄 Marcando primera tarea como completada...

✅ Tareas completadas después del toggle:
- Aprender JavaScript avanzado

📝 Títulos de todas las tareas (usando map):
[
  'Aprender JavaScript avanzado',
  'Practicar clases y promesas',
  'Entregar ejercicio formativo',
  'Revisar criterios de evaluación'
]

🔍 Buscando tarea "Practicar clases y promesas":
Encontrada: Practicar clases y promesas (ID: 2)
```

## Créditos del Autor

**Franco Lapalma** - Estudiante de Diplomatura en Desarrollo Web

## Citación de Fuentes y Bibliografía

### Libros
- Flanagan, D. *JavaScript: The Definitive Guide*. 7ª ed. O'Reilly Media; 2020.
- Freeman, E. y Robson E. *Head First JavaScript Programming*. 1ª ed. O'Reilly Media; 2014.

### Documentación en línea
- MDN Web Docs. *Classes*. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- MDN Web Docs. *Promise*. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- MDN Web Docs. *Array methods*. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array