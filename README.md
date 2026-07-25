# Eventos en Formularios - React

Proyecto educativo que demuestra el manejo de eventos en formularios y componentes con React, utilizando eventos nativos y la libreria react-hook-form.

## Descripcion

Este proyecto implementa un formulario controlado en React que captura y maneja los principales eventos del navegador: `onChange`, `onFocus`, `onBlur`, `onSubmit` (con `preventDefault()`), `onKeyDown` (deteccion de Enter) y `onMouseEnter`/`onMouseLeave` (hover en boton). Ademas, incluye una segunda version del mismo formulario construida con `react-hook-form` para comparar diferencias en codigo, validacion y comportamiento.

## Eventos implementados

| Evento | Componente | Descripcion |
|---|---|---|
| `onChange` | Campos nombre y email | Registra cada cambio en consola y panel visual |
| `onFocus` | Campos nombre y email | Muestra mensaje cuando el campo esta activo |
| `onBlur` | Campos nombre y email | Muestra mensaje cuando el campo pierde el foco |
| `onSubmit` | Formulario | Previene recarga con `preventDefault()` y muestra datos en consola |
| `onKeyDown` | Campo nombre | Detecta si se presiona la tecla Enter |
| `onMouseEnter` | Boton de envio | Cambia el estilo del boton al pasar el mouse |
| `onMouseLeave` | Boton de envio | Restaura el estilo al salir el mouse del boton |

## Estructura del proyecto

```
eventos-formulario/
├── src/
│   ├── components/
│   │   ├── FormularioEventos.jsx     # Formulario con eventos nativos de React
│   │   └── FormularioHookForm.jsx    # Formulario con react-hook-form (opcional)
│   ├── App.jsx                       # Componente principal con tabs de navegacion
│   ├── App.css                       # Estilos globales
│   └── main.jsx                      # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Instalacion y ejecucion

### Requisitos previos
- Node.js 18 o superior
- npm 9 o superior

### Pasos

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd eventos-formulario
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador la URL que indica la terminal (generalmente `http://localhost:5173`).

## Capturas de pantalla

### Formulario con eventos nativos - Estado inicial
El formulario muestra los campos de nombre y email vacios, junto con el panel de registro de eventos. Al hacer clic en un campo se activa el mensaje de foco correspondiente.

### onChange y onFocus/Blur en accion
Al escribir en los campos, cada cambio se registra en el panel de eventos y en la consola del navegador. Los mensajes de foco aparecen y desaparecen segun el campo activo.

### onSubmit con preventDefault()
Al enviar el formulario, la pagina no se recarga (gracias a preventDefault) y los datos ingresados se muestran en pantalla y en la consola.

### onKeyDown - Deteccion de Enter
Al presionar Enter dentro del campo nombre, aparece un mensaje amarillo informando la tecla presionada y el valor actual del campo.

### onMouseEnter y onMouseLeave
Al pasar el mouse sobre el boton de envio, este cambia de estilo (color mas oscuro y sombra). Al retirar el mouse, vuelve a su estado normal.

### Version con react-hook-form
La segunda pestana muestra el mismo formulario usando react-hook-form. Incluye validacion declarativa, errores automaticos y un preview en tiempo real con watch().

## Tecnologias

- **React 18** - Libreria de UI
- **react-hook-form 7** - Manejo de formularios (version opcional)
- **Vite 6** - Bundler y servidor de desarrollo
- **CSS puro** - Estilos (sin frameworks externos)

## Bibliografia

- Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2a ed. O'Reilly Media; 2020.
- Freeman, E. y Robson E. *Head First. JavaScript Programming*. 1a ed. Estados Unidos: O'Reilly Media; 2014. https://nibmehub.com/opac-service/pdf/read/Head%20First%20JavaScript%20Progra
mming%20_%20a%20learner's%20guide%20to%20JavaScript%20programming-compre
ssed.pdf
- MDN Web Docs. (s.f.). *DOM events*. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Web/Events
- React. (s.f.). *Responding to Events*. https://react.dev/learn/responding-to-events
- React Hook Form. (s.f.). *Documentacion oficial*. https://react-hook-form.com/

---

**Autor:** Franco Lapalma  
**Curso:** Desarrollo en Node.js  
**Unidad:** Modulo 2 - Unidad 4 - Eventos en formularios y componentes
