const BASE_URL = 'https://rickandmortyapi.com/api';

// Elementos del DOM
const contenedorApi = document.getElementById('contenedor-api');
const buscadorApi = document.getElementById('buscador-api');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const infoPagina = document.getElementById('info-pagina');
const botonesTabs = document.querySelectorAll('.nav-pills .nav-link');

// Estado actual
let seccionActual = 'character'; // character, location, episode
let urlActual = `${BASE_URL}/character`;
let paginaActual = 1;
let totalPaginas = 1;
let timerDebounce = null;

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    consultarApi(urlActual);
});

// Cambiar entre pestañas (Personajes, Ubicaciones, Episodios)
botonesTabs.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesTabs.forEach(b => b.classList.remove('active', 'bg-success', 'text-dark'));
        botonesTabs.forEach(b => b.classList.add('text-light'));
        
        e.target.classList.add('active', 'bg-success', 'text-dark');
        e.target.classList.remove('text-light');

        seccionActual = e.target.getAttribute('data-section');
        urlActual = `${BASE_URL}/${seccionActual}`;
        paginaActual = 1;
        buscadorApi.value = '';
        
        consultarApi(urlActual);
    });
});

// Función central para consultar la API con fetch
async function consultarApi(url) {
    contenedorApi.innerHTML = `<div class="col-12 text-center text-muted py-5"><p>Cargando desde la API...</p></div>`;
    
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('No se encontraron resultados');
        
        const datos = await respuesta.json();
        
        totalPaginas = datos.info.pages;
        actualizarPaginacion(datos.info.prev, datos.info.next);
        
        renderizarDatos(datos.results);
    } catch (error) {
        console.error('Error:', error);
        contenedorApi.innerHTML = `<div class="col-12 text-center text-danger py-5"><p>No se encontraron resultados para tu búsqueda.</p></div>`;
        actualizarPaginacion(null, null);
    }
}

// Renderizar tarjetas según la sección activa
function renderizarDatos(elementos) {
    contenedorApi.innerHTML = '';

    elementos.forEach(item => {
        let cardHTML = '';

        if (seccionActual === 'character') {
            cardHTML = `
                <div class="col-md-4">
                    <div class="card bg-secondary text-light shadow-sm h-100 border-0">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-warning">${item.name}</h5>
                            <p class="card-text mb-1"><strong>Estado:</strong> ${item.status}</p>
                            <p class="card-text mb-1"><strong>Especie:</strong> ${item.species}</p>
                            <p class="card-text mb-0"><strong>Origen:</strong> ${item.origin.name}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (seccionActual === 'location') {
            cardHTML = `
                <div class="col-md-4">
                    <div class="card bg-secondary text-light shadow-sm h-100 border-0 p-3">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-warning">${item.name}</h5>
                            <p class="card-text mb-1"><strong>Tipo:</strong> ${item.type}</p>
                            <p class="card-text mb-0"><strong>Dimensión:</strong> ${item.dimension}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (seccionActual === 'episode') {
            cardHTML = `
                <div class="col-md-4">
                    <div class="card bg-secondary text-light shadow-sm h-100 border-0 p-3">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-warning">${item.name}</h5>
                            <p class="card-text mb-1"><strong>Episodio:</strong> ${item.episode}</p>
                            <p class="card-text mb-0"><strong>Fecha de emisión:</strong> ${item.air_date}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        contenedorApi.innerHTML += cardHTML;
    });
}

// Control de Paginación
function actualizarPaginacion(prevUrl, nextUrl) {
    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    btnAnterior.disabled = !prevUrl;
    btnAnterior.onclick = () => {
        if (prevUrl) {
            paginaActual--;
            urlActual = prevUrl;
            consultarApi(urlActual);
        }
    };

    btnSiguiente.disabled = !nextUrl;
    btnSiguiente.onclick = () => {
        if (nextUrl) {
            paginaActual++;
            urlActual = nextUrl;
            consultarApi(urlActual);
        }
    };
}

// Buscador con Debounce de 4 segundos exigido por el proyecto
buscadorApi.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.trim();
    
    // Limpiar el temporizador anterior si sigue escribiendo antes de los 4 segundos
    clearTimeout(timerDebounce);
    
    // Iniciar un nuevo temporizador de 4000 ms (4 segundos)
    timerDebounce = setTimeout(() => {
        paginaActual = 1;
        if (textoBusqueda === '') {
            urlActual = `${BASE_URL}/${seccionActual}`;
        } else {
            urlActual = `${BASE_URL}/${seccionActual}/?name=${encodeURIComponent(textoBusqueda)}`;
        }
        consultarApi(urlActual);
    }, 4000);
});