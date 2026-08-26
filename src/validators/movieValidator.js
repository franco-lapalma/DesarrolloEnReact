const GENEROS = [
  'Acción',
  'Animación',
  'Aventura',
  'Ciencia ficción',
  'Comedia',
  'Crimen',
  'Documental',
  'Drama',
  'Fantástico',
  'Musical',
  'Romance',
  'Suspenso',
  'Terror',
  'Western',
]

export function validarPelicula(pelicula) {
  const errores = {}

  const titulo = String(pelicula.titulo ?? '').trim()
  if (!titulo) {
    errores.titulo = 'El título es obligatorio.'
  } else if (titulo.length < 2) {
    errores.titulo = 'El título debe tener al menos 2 caracteres.'
  }

  const anio = Number(pelicula.anio)
  if (!pelicula.anio || pelicula.anio.toString().trim() === '') {
    errores.anio = 'El año de estreno es obligatorio.'
  } else if (!Number.isInteger(anio) || anio < 1888 || anio > new Date().getFullYear() + 1) {
    errores.anio = 'Ingresá un año válido.'
  }

  const genero = String(pelicula.genero ?? '').trim()
  if (!genero) {
    errores.genero = 'El género es obligatorio.'
  }

  const rating = Number(pelicula.rating)
  if (pelicula.rating === '' || pelicula.rating === null || pelicula.rating === undefined) {
    errores.rating = 'El rating es obligatorio.'
  } else if (Number.isNaN(rating) || rating < 0 || rating > 5) {
    errores.rating = 'El rating debe estar entre 0 y 5.'
  }

  if (pelicula.posterUrl && pelicula.posterUrl.trim()) {
    const url = pelicula.posterUrl.trim()
    if (!imagenValida(url)) {
      errores.posterUrl = 'El póster debe ser una imagen válida.'
    }
  }

  if (pelicula.backdropUrl && pelicula.backdropUrl.trim()) {
    const url = pelicula.backdropUrl.trim()
    if (!imagenValida(url)) {
      errores.backdropUrl = 'La imagen de fondo debe ser válida.'
    }
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  }
}

function urlValida(url) {
  try {
    new URL(url)
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

function imagenValida(valor) {
  return valor.startsWith('data:image/') || urlValida(valor)
}

export function obtenerGeneros() {
  return GENEROS
}