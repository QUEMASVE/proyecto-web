const API_URL = '/api/usuarios';

// Elementos del DOM
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const buscador = document.getElementById('buscador');
const formUsuario = document.getElementById('formUsuario');
const modalUsuarioElement = document.getElementById('modalUsuario');
const modalTitulo = document.getElementById('modalTitulo');
const usuarioIdInput = document.getElementById('usuarioId');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const avatarInput = document.getElementById('avatar');
const bioInput = document.getElementById('bio');
const comidaInput = document.getElementById('comidaFavorita');
const pasatiemposInput = document.getElementById('pasatiempos');

// Elementos del Modal de Detalles
const modalDetalleElement = document.getElementById('modalDetalle');
let modalDetalle = new bootstrap.Modal(modalDetalleElement);
const detalleAvatar = document.getElementById('detalle-avatar');
const detalleNombre = document.getElementById('detalle-nombre');
const detalleEmail = document.getElementById('detalle-email');
const detalleTelefono = document.getElementById('detalle-telefono');
const detalleBio = document.getElementById('detalle-bio');
const detalleComida = document.getElementById('detalle-comida');
const detallePasatiempos = document.getElementById('detalle-pasatiempos');

// Instancia del modal de registro
let modalUsuario = new bootstrap.Modal(modalUsuarioElement);

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
});

// 1. GET: Obtener y mostrar todos los usuarios
async function cargarUsuarios() {
    try {
        const respuesta = await fetch(API_URL);
        const usuarios = await respuesta.json();
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        contenedorTarjetas.innerHTML = `<div class="col-12 text-center text-danger"><p>Error al conectar con el servidor.</p></div>`;
    }
}

// Renderizar tarjetas en la interfaz (Haciendo la tarjeta clickeable para ver detalles)
function mostrarUsuarios(usuarios) {
    contenedorTarjetas.innerHTML = '';

    if (usuarios.length === 0) {
        contenedorTarjetas.innerHTML = `<div class="col-12 text-center text-muted py-5"><p>No hay usuarios registrados.</p></div>`;
        return;
    }

    usuarios.forEach(usuario => {
        const avatarSrc = usuario.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        
        const cardHTML = `
            <div class="col-md-4">
                <div class="card shadow-sm h-100 border-0" style="cursor: pointer;" onclick="verDetalles(${usuario.id}, '${escapeHtml(usuario.nombre)}', '${escapeHtml(usuario.email)}', '${escapeHtml(usuario.telefono || '')}', '${escapeHtml(usuario.avatar || '')}', '${escapeHtml(usuario.bio || '')}', '${escapeHtml(usuario.comidaFavorita || '')}', '${escapeHtml(usuario.pasatiempos || '')}')">
                    <img src="${avatarSrc}" class="card-img-top p-3 rounded-circle mx-auto mt-3" style="width: 120px; height: 120px; object-fit: cover;" alt="Avatar">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold text-dark">${usuario.nombre}</h5>
                        <p class="card-text text-muted small mb-1">📧 ${usuario.email}</p>
                        <p class="card-text text-muted small mb-3">📞 ${usuario.telefono || 'Sin teléfono'}</p>
                        <div class="d-flex justify-content-center gap-2" onclick="event.stopPropagation()">
                            <button class="btn btn-outline-primary btn-sm" onclick="prepararEdicion(${usuario.id}, '${escapeHtml(usuario.nombre)}', '${escapeHtml(usuario.email)}', '${escapeHtml(usuario.telefono || '')}', '${escapeHtml(usuario.avatar || '')}', '${escapeHtml(usuario.bio || '')}', '${escapeHtml(usuario.comidaFavorita || '')}', '${escapeHtml(usuario.pasatiempos || '')}')">Editar</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorTarjetas.innerHTML += cardHTML;
    });
}

// Función auxiliar para evitar errores con comillas en los textos
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// 2. POST / PUT: Guardar o actualizar usuario desde el formulario
formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = usuarioIdInput.value;
    const usuarioData = {
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        avatar: avatarInput.value,
        bio: bioInput.value,
        comidaFavorita: comidaInput.value,
        pasatiempos: pasatiemposInput.value
    };

    try {
        let respuesta;
        if (id) {
            respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
        } else {
            respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
        }

        if (respuesta.ok) {
            formUsuario.reset();
            usuarioIdInput.value = '';
            modalUsuario.hide();
            cargarUsuarios();
        } else {
            alert('Error al guardar el usuario. Verifica los datos.');
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});

// 3. Abrir Modal de Vista Detallada
window.verDetalles = function(id, nombre, email, telefono, avatar, bio, comida, pasatiempos) {
    detalleAvatar.src = avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    detalleNombre.textContent = nombre;
    detalleEmail.textContent = email;
    detalleTelefono.textContent = telefono && telefono !== 'null' ? telefono : 'No especificado';
    detalleBio.textContent = bio && bio !== 'null' ? bio : 'Sin biografía registrada.';
    detalleComida.textContent = comida && comida !== 'null' ? comida : 'No especificada';
    detallePasatiempos.textContent = pasatiempos && pasatiempos !== 'null' ? pasatiempos : 'No especificados';

    modalDetalle.show();
}

// 4. Preparar el modal para editar (incluyendo los nuevos campos)
window.prepararEdicion = function(id, nombre, email, telefono, avatar, bio, comida, pasatiempos) {
    usuarioIdInput.value = id;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono !== 'null' ? telefono : '';
    avatarInput.value = avatar !== 'null' ? avatar : '';
    bioInput.value = bio !== 'null' ? bio : '';
    comidaInput.value = comida !== 'null' ? comida : '';
    pasatiemposInput.value = pasatiempos !== 'null' ? pasatiempos : '';
    
    modalTitulo.textContent = 'Editar Usuario';
    modalUsuario.show();
}

// Limpiar el modal de registro al cerrar
modalUsuarioElement.addEventListener('hidden.bs.modal', () => {
    formUsuario.reset();
    usuarioIdInput.value = '';
    modalTitulo.textContent = 'Registrar Nuevo Usuario';
});

// 5. DELETE: Eliminar usuario por ID
window.eliminarUsuario = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                cargarUsuarios();
            } else {
                alert('No se pudo eliminar el usuario.');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
}

// 6. Buscador en tiempo real por nombre
buscador.addEventListener('input', async (e) => {
    const texto = e.target.value.toLowerCase();
    try {
        const respuesta = await fetch(API_URL);
        const usuarios = await respuesta.json();
        const filtrados = usuarios.filter(u => u.nombre.toLowerCase().includes(texto));
        mostrarUsuarios(filtrados);
    } catch (error) {
        console.error('Error en búsqueda:', error);
    }
});