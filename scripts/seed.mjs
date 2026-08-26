import { readFileSync } from 'node:fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const rutaServicio = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
if (!rutaServicio) {
  console.error(
    'Falta la variable FIREBASE_SERVICE_ACCOUNT_PATH en el archivo .env ' +
      'con la ruta al JSON de la cuenta de servicio.'
  )
  process.exit(1)
}

let serviceAccount
try {
  serviceAccount = JSON.parse(readFileSync(rutaServicio, 'utf8'))
} catch (err) {
  console.error('No se pudo leer el archivo de la cuenta de servicio:', err.message)
  process.exit(1)
}

const app = initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore(app)

const PELICULAS = [
  {
    titulo: 'El padrino',
    anio: 1972,
    genero: 'Drama',
    rating: 5,
    favorita: true,
    posterUrl: '/posters/el-padrino.jpg',
    backdropUrl: '/posters/el-padrino-backdrop.jpg',
    sinopsis: 'Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York en los años 40. Su hijo menor, Michael, un héroe de guerra que inicialmente quiere mantenerse al margen de los negocios familiares, termina sucediéndole al frente del imperio criminal.'
  },
  {
    titulo: 'Volver al futuro',
    anio: 1985,
    genero: 'Ciencia ficción',
    rating: 4.5,
    favorita: true,
    posterUrl: '/posters/volver-al-futuro.jpg',
    backdropUrl: '/posters/volver-al-futuro-backdrop.jpg',
    sinopsis: 'Marty McFly, un adolescente de 17 años, es transportado accidentalmente 30 años al pasado en una máquina del tiempo construida por su excéntrico amigo, el doctor Emmett Brown. Allí debe asegurarse de que sus padres se conozcan y se enamoren, o dejará de existir.'
  },
  {
    titulo: 'El viaje de Chihiro',
    anio: 2001,
    genero: 'Animación',
    rating: 4.5,
    favorita: false,
    posterUrl: '/posters/chihiro.jpg',
    backdropUrl: '/posters/chihiro-backdrop.jpg',
    sinopsis: 'Chihiro, una niña de 10 años, se muda con sus padres a una nueva casa. Por el camino, descubren un parque de atracciones abandonado. Cuando sus padres son transformados en cerdos, Chihiro debe trabajar en una casa de baños para espíritus para liberarlos.'
  },
  {
    titulo: 'Titanic',
    anio: 1997,
    genero: 'Romance',
    rating: 4,
    favorita: false,
    posterUrl: '/posters/titanic.jpg',
    backdropUrl: '/posters/titanic.jpg',
    sinopsis: 'Jack Dawson y Rose DeWitt Bukater, de diferentes clases sociales, se enamoran a bordo del RMS Titanic durante su viaje inaugural. Su historia de amor se ve truncada cuando el barco choca contra un iceberg y comienza a hundirse.'
  },
  {
    titulo: 'Inception',
    anio: 2010,
    genero: 'Acción',
    rating: 4.5,
    favorita: true,
    posterUrl: '/posters/inception.jpg',
    backdropUrl: '/posters/inception-backdrop.jpg',
    sinopsis: 'Dom Cobb es un ladrón experto en el arte de la extracción: robar secretos del subconsciente durante el sueño. Le ofrecen una última oportunidad de redención si logra lo imposible: la inception, implantar una idea en la mente de alguien.'
  },
  {
    titulo: 'La La Land',
    anio: 2016,
    genero: 'Musical',
    rating: 4,
    favorita: false,
    posterUrl: '/posters/la-la-land.jpg',
    backdropUrl: '/posters/la-la-land.jpg',
    sinopsis: 'Mia, una aspirante a actriz, y Sebastian, un pianista de jazz, se enamoran en Los Ángeles mientras persiguen sus sueños. A medida que el éxito llama a sus puertas, deben decidir qué están dispuestos a sacrificar.'
  },
  {
    titulo: 'Scream',
    anio: 1996,
    genero: 'Terror',
    rating: 3.5,
    favorita: false,
    posterUrl: '/posters/scream.jpg',
    backdropUrl: '/posters/scream.jpg',
    sinopsis: 'Un asesino en serie conocido como Ghostface comienza a aterrorizar a un grupo de adolescentes en Woodsboro. Sidney Prescott y sus amigos deben descubrir la identidad del asesino mientras intentan sobrevivir siguiendo las reglas de las películas de terror.'
  },
  {
    titulo: 'El club de la pelea',
    anio: 1999,
    genero: 'Drama',
    rating: 4,
    favorita: true,
    posterUrl: '/posters/club-de-la-pelea.jpg',
    backdropUrl: '/posters/club-de-la-pelea-backdrop.jpg',
    sinopsis: 'Un oficinista insomne y un vendedor de jabón carismático forman un club de lucha clandestino que evoluciona en algo mucho más peligroso. Una exploración de la masculinidad, el consumismo y la identidad en la sociedad moderna.'
  },
]

const COLECCION = 'peliculas'

async function limpiarColeccion() {
  const snapshot = await db.collection(COLECCION).get()
  if (snapshot.empty) return 0
  const batch = db.batch()
  snapshot.docs.forEach((doc) => batch.delete(doc.ref))
  await batch.commit()
  return snapshot.size
}

async function cargarEjemplos() {
  const batch = db.batch()
  for (const pelicula of PELICULAS) {
    batch.set(db.collection(COLECCION).doc(), pelicula)
  }
  await batch.commit()
  return PELICULAS.length
}

const comando = process.argv[2] ?? 'seed'

if (comando === 'limpiar') {
  const cantidad = await limpiarColeccion()
  console.log(`Se eliminaron ${cantidad} películas de la colección "${COLECCION}".`)
} else if (comando === 'seed') {
  const eliminadas = await limpiarColeccion()
  const creadas = await cargarEjemplos()
  console.log(`Colección "${COLECCION}" lista: ${creadas} películas de ejemplo cargadas (${eliminadas} previas eliminadas).`)
} else {
  console.error('Comando no válido. Usá: seed  o  limpiar')
  process.exit(1)
}

process.exit(0)