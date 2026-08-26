import { variablesFaltantes } from '../config/firebase'
import { Icon } from '../components/Icon'

export default function ConfigWarningView() {
  return (
    <section className="config-warning" role="alert">
      <div className="config-warning__icon" aria-hidden>
        <Icon name="info" size={48} />
      </div>
      <h1 className="config-warning__title">Configuración pendiente</h1>
      <p className="config-warning__message">
        La aplicación no puede conectarse a Firebase porque faltan las siguientes variables de entorno:
      </p>
      <ul className="config-warning__list">
        {variablesFaltantes.map((v) => (
          <li key={v}><code>{v}</code></li>
        ))}
      </ul>
      <div className="config-warning__steps">
        <ol>
          <li>
            Completá esas variables en el archivo <code>.env</code> (usá <code>.env.example</code> como plantilla)
            con los datos de tu proyecto en Firebase Console.
          </li>
          <li>
            Reiniciá el servidor de desarrollo (<code>npm run dev</code>) para que Vite lea los cambios.
          </li>
        </ol>
      </div>
    </section>
  )
}