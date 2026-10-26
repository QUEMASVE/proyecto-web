# 🚀 Sistema Web de Gestión de Usuarios y Explorador Rick & Morty

Proyecto académico desarrollado para la materia de Programación. Implementa una arquitectura monolítica en capas con Spring Boot en el Backend, PostgreSQL para la persistencia de datos y una interfaz web dinámica construida con Vanilla JavaScript y Bootstrap 5.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Java 17, Spring Boot 3.3.5, Spring Data JPA.
- **Base de Datos:** PostgreSQL 17.
- **Frontend:** HTML5, CSS3 (Efectos Hover), Vanilla JavaScript, Bootstrap 5.
- **Herramientas & Control de Versiones:** Git, GitHub, NetBeans.

---

## 📌 Funcionalidades Principales

### 1. Gestión de Usuarios (CRUD Local)
- **Creación y Edición:** Modales dinámicos para registrar y actualizar usuarios.
- **Persistencia en BD:** Almacenamiento directo en PostgreSQL (`nombre`, `email`, `telefono`, `avatar`, `bio`, `comidaFavorita`, `pasatiempos`).
- **Vista Detallada:** Modal especializado que se abre al seleccionar una tarjeta.
- **Buscador Dinámico:** Filtro en tiempo real por nombre de usuario.
- **Interfaz Interactiva:** Tarjetas con animaciones `hover` de elevación y zoom en avatares.

### 2. Explorador Rick & Morty (API Externa)
- Consumo asíncrono de la API pública oficial (`fetch`).
- Exploración por personajes, ubicaciones y episodios.
- Paginación interactiva y buscador con **debounce** de 4 segundos.

---

## 🌿 Estructura de Ramas (Gitflow)

- `main`: Código oficial y estable listo para producción/defensa.
- `developer`: Rama activa de desarrollo y consolidación de características.
- `test`: Rama destinada a pruebas de integración.

---

## 👥 Autor
- **Marcos Burga** - Estudiante de Ingeniería