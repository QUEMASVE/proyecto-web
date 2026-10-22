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

// Instancia del modal de Bootstrap
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

// Renderizar tarjetas en la interfaz
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
                <div class="card shadow-sm h-100 border-0">
                    <img src="${avatarSrc}" class="card-img-top p-3 rounded-circle mx-auto mt-3" style="width: 120px; height: 120px; object-fit: cover;" alt="Avatar">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold text-dark">${usuario.nombre}</h5>
                        <p class="card-text text-muted small mb-1">📧 ${usuario.email}</p>
                        <p class="card-text text-muted small mb-3">📞 ${usuario.telefono || 'Sin teléfono'}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="prepararEdicion(${usuario.id}, '${usuario.nombre}', '${usuario.email}', '${usuario.telefono || ''}', '${usuario.avatar || ''}')">Editar</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorTarjetas.innerHTML += cardHTML;
    });
}

// 2. POST / PUT: Guardar o actualizar usuario desde el formulario
formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = usuarioIdInput.value;
    const usuarioData = {
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        avatar: avatarInput.value
    };

    try {
        let respuesta;
        if (id) {
            // Actualizar (PUT)
            respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
        } else {
            // Crear nuevo (POST)
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
            cargarUsuarios(); // Recargar la galería
        } else {
            alert('Error al guardar el usuario. Verifica los datos.');
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});

// 3. Preparar el modal para editar
window.prepararEdicion = function(id, nombre, email, telefono, avatar) {
    usuarioIdInput.value = id;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono !== 'null' ? telefono : '';
    avatarInput.value = avatar !== 'null' ? avatar : '';
    
    modalTitulo.textContent = 'Editar Usuario';
    modalUsuario.show();
}

// Limpiar el modal cuando se cierre para crear uno nuevo
modalUsuarioElement.addEventListener('hidden.bs.modal', () => {
    formUsuario.reset();
    usuarioIdInput.value = '';
    modalTitulo.textContent = 'Registrar Nuevo Usuario';
});

// 4. DELETE: Eliminar usuario por ID
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

// 5. Buscador en tiempo real por nombre
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