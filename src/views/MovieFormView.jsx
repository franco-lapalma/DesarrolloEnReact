import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as moviesService from '../services/moviesService'
import { validarPelicula, obtenerGeneros } from '../validators/movieValidator'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { Icon } from '../components/Icon'

const PELICULA_VACIA = {
  titulo: '',
  anio: '',
  genero: '',
  rating: '',
  favorita: false,
  posterUrl: '',
  backdropUrl: '',
  sinopsis: '',
}

const MAX_IMAGE_SIZE = 350 * 1024

export default function MovieFormView() {
  const { id } = useParams()
  const esEdicion = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(PELICULA_VACIA)
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(esEdicion)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mensajeOk, setMensajeOk] = useState('')

  const inputTituloRef = useRef(null)

  useEffect(() => {
    if (!cargando && inputTituloRef.current) {
      inputTituloRef.current.focus()
    }
  }, [cargando])

  useEffect(() => {
    if (!esEdicion) return

    let activo = true
    moviesService
      .obtenerPorId(id)
      .then((pelicula) => {
        if (!activo) return
        if (!pelicula) {
          setError('La película no existe.')
          return
        }
        setForm({
          titulo: pelicula.titulo ?? '',
          anio: pelicula.anio ?? '',
          genero: pelicula.genero ?? '',
          rating: pelicula.rating ?? '',
          favorita: pelicula.favorita ?? false,
          posterUrl: pelicula.posterUrl ?? '',
          backdropUrl: pelicula.backdropUrl ?? '',
          sinopsis: pelicula.sinopsis ?? '',
        })
      })
      .catch((err) => {
        console.error(err)
        if (activo) setError('No se pudo cargar la película para editar.')
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [id, esEdicion])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((actual) => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrores((actual) => ({ ...actual, [name]: undefined }))
  }

  const handleImageChange = (e, campo) => {
    const archivo = e.target.files?.[0]
    if (!archivo) return

    if (!archivo.type.startsWith('image/')) {
      setErrores((actual) => ({ ...actual, [campo]: 'Seleccioná un archivo de imagen.' }))
      return
    }

    if (archivo.size > MAX_IMAGE_SIZE) {
      setErrores((actual) => ({ ...actual, [campo]: 'La imagen debe pesar menos de 350 KB.' }))
      return
    }

    const lector = new FileReader()
    lector.onload = () => {
      setForm((actual) => ({ ...actual, [campo]: lector.result }))
      setErrores((actual) => ({ ...actual, [campo]: undefined }))
    }
    lector.onerror = () => {
      setErrores((actual) => ({ ...actual, [campo]: 'No se pudo leer la imagen.' }))
    }
    lector.readAsDataURL(archivo)
  }

  const limpiarFormulario = () => {
    setForm(PELICULA_VACIA)
    setErrores({})
    setMensajeOk('')
    if (inputTituloRef.current) {
      inputTituloRef.current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMensajeOk('')

    const resultado = validarPelicula(form)
    if (!resultado.valido) {
      setErrores(resultado.errores)
      if (resultado.errores.titulo && inputTituloRef.current) {
        inputTituloRef.current.focus()
      }
      return
    }

    const datosCompletos = {
      titulo: form.titulo.trim(),
      anio: Number(form.anio),
      genero: form.genero,
      rating: Number(form.rating),
      favorita: form.favorita,
      posterUrl: form.posterUrl.trim() || undefined,
      backdropUrl: form.backdropUrl.trim() || undefined,
      sinopsis: form.sinopsis.trim() || undefined,
    }
    const datos = Object.fromEntries(
      Object.entries(datosCompletos).filter(([, valor]) => valor !== undefined)
    )

    setGuardando(true)
    try {
      if (esEdicion) {
        await moviesService.actualizar(id, datos)
        setMensajeOk('Película actualizada correctamente.')
      } else {
        const creada = await moviesService.crear(datos)
        navigate(`/movies/${creada.id}`)
      }
    } catch (err) {
      console.error(err)
      setError(
        esEdicion
          ? 'No se pudo actualizar la película. Intentá de nuevo.'
          : 'No se pudo guardar la película. Intentá de nuevo.'
      )
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) {
    return <Loading mensaje="Cargando película…" />
  }

  return (
    <section className="form-view" role="main">
      <div className="form-view__header">
        <h1 className="form-view__title">{esEdicion ? 'Editar película' : 'Nueva película'}</h1>
        <p className="form-view__subtitle">{esEdicion ? 'Modificá los datos de la película' : 'Completá la información para agregarla a tu colección'}</p>
      </div>

      <ErrorMessage mensaje={error} onDismiss={() => setError('')} />

      {mensajeOk && (
        <div className="form-view__success" role="status">
          <Icon name="check" size={20} aria-hidden />
          {mensajeOk}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form__section">
          <h2 className="form__section-title">Información básica</h2>

          <div className="form__field">
            <label htmlFor="titulo" className="form__label">Título *</label>
            <div className="form__input-wrapper">
              <Icon name="film" className="form__icon" size={20} aria-hidden />
              <input
                id="titulo"
                name="titulo"
                type="text"
                ref={inputTituloRef}
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ej: El padrino"
                className="form__input"
                autoComplete="off"
              />
            </div>
            {errores.titulo && <span className="form__error">{errores.titulo}</span>}
          </div>

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="anio" className="form__label">Año *</label>
              <div className="form__input-wrapper">
                <Icon name="info" className="form__icon" size={20} aria-hidden />
                <input
                  id="anio"
                  name="anio"
                  type="number"
                  min="1888"
                  max={new Date().getFullYear() + 1}
                  value={form.anio}
                  onChange={handleChange}
                  placeholder="1972"
                  className="form__input"
                />
              </div>
              {errores.anio && <span className="form__error">{errores.anio}</span>}
            </div>

            <div className="form__field">
              <label htmlFor="genero" className="form__label">Género *</label>
              <div className="form__select-wrapper">
                <select id="genero" name="genero" value={form.genero} onChange={handleChange} className="form__select">
                  <option value="">Seleccioná un género</option>
                  {obtenerGeneros().map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <Icon name="chevronRight" className="form__select-icon" size={20} aria-hidden />
              </div>
              {errores.genero && <span className="form__error">{errores.genero}</span>}
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="rating" className="form__label">Rating (0 a 5) *</label>
            <div className="form__input-wrapper">
              <Icon name="star" className="form__icon" size={20} aria-hidden />
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.5"
                className="form__input"
              />
            </div>
            {errores.rating && <span className="form__error">{errores.rating}</span>}
          </div>

          <div className="form__field form__field--checkbox">
            <label htmlFor="favorita" className="form__checkbox-label">
              <input
                id="favorita"
                name="favorita"
                type="checkbox"
                checked={form.favorita}
                onChange={handleChange}
                className="form__checkbox"
              />
              <span className="form__checkbox-text">Marcar como favorita</span>
            </label>
          </div>
        </div>

        <div className="form__section">
          <h2 className="form__section-title">Imágenes y descripción (opcional)</h2>

          <div className="form__field">
            <label htmlFor="posterUrl" className="form__label">Póster</label>
            <div className="form__input-wrapper">
              <Icon name="image" className="form__icon" size={20} aria-hidden />
              <input
                id="posterUrl"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'posterUrl')}
                className="form__input form__file"
              />
            </div>
            {errores.posterUrl && <span className="form__error">{errores.posterUrl}</span>}
            {form.posterUrl && <img className="form__image-preview form__image-preview--poster" src={form.posterUrl} alt="Vista previa del póster" />}
            <p className="form__hint">Elegí una imagen del equipo. Máximo 350 KB; recomendado 342x513px.</p>
          </div>

          <div className="form__field">
            <label htmlFor="backdropUrl" className="form__label">Imagen de fondo</label>
            <div className="form__input-wrapper">
              <Icon name="image" className="form__icon" size={20} aria-hidden />
              <input
                id="backdropUrl"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'backdropUrl')}
                className="form__input form__file"
              />
            </div>
            {errores.backdropUrl && <span className="form__error">{errores.backdropUrl}</span>}
            {form.backdropUrl && <img className="form__image-preview form__image-preview--backdrop" src={form.backdropUrl} alt="Vista previa de la imagen de fondo" />}
            <p className="form__hint">Elegí una imagen del equipo. Máximo 350 KB; recomendado 1280x720px.</p>
          </div>

          <div className="form__field">
            <label htmlFor="sinopsis" className="form__label">Sinopsis</label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              value={form.sinopsis}
              onChange={handleChange}
              placeholder="Descripción breve de la película..."
              className="form__textarea"
              rows={4}
            />
            <p className="form__hint">Máximo 500 caracteres</p>
          </div>
        </div>

        <div className="form__actions">
          <button type="submit" className="btn btn--primary btn--lg" disabled={guardando}>
            {guardando ? (
              <>
                <span className="btn__spinner" aria-hidden />
                Guardando…
              </>
            ) : esEdicion ? (
              'Guardar cambios'
            ) : (
              <>
                <Icon name="plus" size={18} aria-hidden />
                Guardar película
              </>
            )}
          </button>
          <button type="button" className="btn btn--ghost btn--lg" onClick={limpiarFormulario}>
            Limpiar
          </button>
        </div>
      </form>
    </section>
  )
}