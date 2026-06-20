const form = document.querySelector('#registroForm');
const nombreInput = document.querySelector('#nombre');
const edadInput = document.querySelector('#edad');
const mensajeDiv = document.querySelector('#mensaje');

function validarFormulario(event) {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const edad = Number(edadInput.value);

    if(edad >= 18) {
        mensajeDiv.textContent = `✅ Bienvenido, ${nombre}, tienes acceso al evento.`;
        mensajeDiv.classList.add('mensaje-positivo');
        mensajeDiv.classList.remove('mensaje-negativo');
    } else {
        mensajeDiv.textContent = `❌ Lo sentimos, ${nombre}, debes ser mayor de edad.`;
        mensajeDiv.classList.add('mensaje-negativo');
        mensajeDiv.classList.remove('mensaje-positivo');
    }
}

form.addEventListener('submit', validarFormulario);