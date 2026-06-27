class Tarea {
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(titulo) {
    const nuevaTarea = new Tarea(Date.now(), titulo);
    this.tareas.push(nuevaTarea);
    return nuevaTarea;
  }

  listarTareas() {
    this.tareas.forEach((tarea, index) => {
      console.log(`${index + 1}. [${tarea.completada ? 'X' : ' '}] ${tarea.titulo} (ID: ${tarea.id})`);
    });
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
  }

  listarCompletadas() {
    return this.tareas.filter(tarea => tarea.completada);
  }

  obtenerTitulos() {
    return this.tareas.map(tarea => tarea.titulo);
  }
}

function cargarTareas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tareasIniciales = [
        new Tarea(1, 'Aprender JavaScript avanzado'),
        new Tarea(2, 'Practicar clases y promesas'),
        new Tarea(3, 'Entregar ejercicio formativo')
      ];
      resolve(tareasIniciales);
    }, 2000);
  });
}

function cargarUsuarios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, nombre: 'Franco' },
        { id: 2, nombre: 'Usuario Demo' }
      ]);
    }, 1500);
  });
}

async function main() {
  const gestor = new GestorTareas();

  console.log('Cargando tareas iniciales...');
  const [tareas, usuarios] = await Promise.all([cargarTareas(), cargarUsuarios()]);

  tareas.forEach(tarea => gestor.tareas.push(tarea));

  console.log('\n✅ Tareas cargadas correctamente');
  console.log(`👥 Usuarios cargados: ${usuarios.map(u => u.nombre).join(', ')}`);

  console.log('\n📋 Lista de tareas:');
  gestor.listarTareas();

  console.log('\n➕ Agregando nueva tarea...');
  gestor.agregarTarea('Revisar criterios de evaluación');
  console.log('Lista actualizada:');
  gestor.listarTareas();

  console.log('\n✅ Tareas completadas:');
  const completadas = gestor.listarCompletadas();
  if (completadas.length === 0) {
    console.log('(ninguna tarea completada aún)');
  } else {
    completadas.forEach(t => console.log(`- ${t.titulo}`));
  }

  console.log('\n🔄 Marcando primera tarea como completada...');
  if (gestor.tareas.length > 0) {
    gestor.tareas[0].toggleEstado();
  }

  console.log('\n✅ Tareas completadas después del toggle:');
  gestor.listarCompletadas().forEach(t => console.log(`- ${t.titulo}`));

  console.log('\n📝 Títulos de todas las tareas (usando map):');
  console.log(gestor.obtenerTitulos());

  console.log('\n🔍 Buscando tarea "Practicar clases y promesas":');
  const encontrada = gestor.buscarPorTitulo('Practicar clases y promesas');
  console.log(encontrada ? `Encontrada: ${encontrada.titulo} (ID: ${encontrada.id})` : 'No encontrada');
}

main();