export default function Nosotros() {
  return (
    <div className="page-container">
      <h1>Nosotros</h1>

      <p className="page-description">
        Somos un equipo apasionado por el desarrollo web moderno.
        Este proyecto fue creado como parte del Modulo 2 - Unidad 3
        para demostrar los conceptos de enrutamiento en React.
      </p>

      <div className="card">
        <h3>Nuestra mision</h3>
        <p>
          Facilitar el aprendizaje de React Router mediante ejemplos practicos
          y claros, cubriendo todos los conceptos fundamentales del enrutamiento
          en aplicaciones React: rutas estaticas, dinamicas, protegidas,
          anidadas, query params y navegacion imperativa.
        </p>
      </div>

      <div className="card">
        <h3>Tecnologias</h3>
        <ul>
          <li>React 18 con Vite</li>
          <li>React Router DOM v6</li>
          <li>JavaScript moderno (ES6+)</li>
          <li>CSS puro (sin frameworks)</li>
        </ul>
      </div>
    </div>
  )
}