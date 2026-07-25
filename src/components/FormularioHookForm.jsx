import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function FormularioHookForm() {
  // react-hook-form: register maneja onChange, onFocus, onBlur internamente
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: { nombre: '', email: '' }
  })

  const [enviado, setEnviado] = useState(null)

  // watch permite observar valores en tiempo real (equivale a onChange)
  const nombreValue = watch('nombre')
  const emailValue = watch('email')

  const onSubmit = (data) => {
    console.log('react-hook-form onSubmit:', data)
    setEnviado(data)
  }

  const handleReset = () => {
    reset()
    setEnviado(null)
  }

  return (
    <div>
      {/* Explicacion */}
      <div className="highlight-box">
        <h3>Formulario con react-hook-form</h3>
        <p>
          Esta version usa <code>react-hook-form</code> para manejar el estado del formulario.
          El hook <code>register()</code> internamente gestiona <code>onChange</code>,{' '}
          <code>onBlur</code> y <code>onFocus</code> sin necesidad de escribir handlers manualmente.
          La validacion se declara directamente en <code>register</code>.
        </p>
      </div>

      {/* Comparacion rapida */}
      <div className="card">
        <h3>Comparacion: Eventos nativos vs react-hook-form</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspecto</th>
              <th>Eventos nativos</th>
              <th>react-hook-form</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estado</td>
              <td>useState manual por campo</td>
              <td>Un solo useForm() para todo</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>Handler explícito</td>
              <td>register() lo maneja</td>
            </tr>
            <tr>
              <td>onBlur</td>
              <td>Handler explícito</td>
              <td>register() lo maneja</td>
            </tr>
            <tr>
              <td>Validacion</td>
              <td>Manual en el handler</td>
              <td>Declarativa en register()</td>
            </tr>
            <tr>
              <td>Errores</td>
              <td>Estado manual</td>
              <td>formState.errors automatico</td>
            </tr>
            <tr>
              <td>Re-render</td>
              <td>Cada cambio re-renderiza</td>
              <td>Menos re-renders (no reenderiza en cada cambio)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Formulario react-hook-form */}
      {enviado ? (
        <div className="card success-card">
          <h3>Formulario enviado correctamente</h3>
          <div className="submitted-data">
            <h4>Datos recibidos (react-hook-form):</h4>
            <pre>{JSON.stringify(enviado, null, 2)}</pre>
          </div>
          <p>Observa que los errores de validacion aparecen al perder el foco, no en cada cambio.</p>
          <button className="btn-submit" style={{ marginTop: '1rem' }} onClick={handleReset}>
            Enviar otro formulario
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>Formulario con react-hook-form</h2>
          <p>
            Los campos se validan al perder el foco (modo onBlur por defecto en register).
            Probá dejar vacios y hacer clic fuera del campo.
          </p>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo nombre */}
            <div className="form-group">
              <label htmlFor="rhf-nombre">Nombre:</label>
              <input
                id="rhf-nombre"
                type="text"
                placeholder="Escribe tu nombre"
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
              />
              {errors.nombre && (
                <span className="focus-message" style={{ color: '#dc2626' }}>
                  {errors.nombre.message}
                </span>
              )}
            </div>

            {/* Campo email */}
            <div className="form-group">
              <label htmlFor="rhf-email">Correo electronico:</label>
              <input
                id="rhf-email"
                type="email"
                placeholder="tu@email.com"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email no valido'
                  }
                })}
              />
              {errors.email && (
                <span className="focus-message" style={{ color: '#dc2626' }}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn-submit">
              Enviar formulario
            </button>
          </form>

          {/* Preview en tiempo real usando watch() */}
          <div className="submitted-data" style={{ marginTop: '1rem' }}>
            <h4>Valores en tiempo real (watch):</h4>
            <pre>{JSON.stringify({ nombre: nombreValue, email: emailValue }, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
