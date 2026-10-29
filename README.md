# 🚀 User Management System & Rick & Morty Explorer

Academic project developed for the Programming course. Implements a layered monolithic architecture with Spring Boot for the Backend, PostgreSQL for data persistence, and a dynamic web interface built with Vanilla JavaScript and Bootstrap 5.

---

## 🛠️ Technologies Used

- **Backend:** Java 17, Spring Boot 3.3.5, Spring Data JPA.
- **Database:** PostgreSQL 17.
- **Frontend:** HTML5, CSS3 (Hover Effects), Vanilla JavaScript, Bootstrap 5.
- **Tools & Version Control:** Git, GitHub, NetBeans.

---

## 📌 Main Features

### 1. User Management (Local CRUD)
- **Create and Edit:** Dynamic modals to register and update users.
- **Database Persistence:** Direct storage in PostgreSQL (`name`, `email`, `phone`, `avatar`, `bio`, `favoriteFood`, `hobbies`).
- **Detailed View:** Specialized modal that opens when selecting a card.
- **Dynamic Search:** Real-time filter by username.
- **Interactive Interface:** Cards with `hover` animations for elevation and avatar zoom.

### 2. Rick & Morty Explorer (External API)
- Asynchronous consumption of the official public API (`fetch`).
- Exploration of characters, locations, and episodes.
- Interactive pagination and search with a **4-second debounce**.

---

## 🌿 Branch Structure (Gitflow)

- `main`: Official and stable code ready for production/defense.
- `developer`: Active development and feature integration branch.
- `test`: Branch dedicated to integration testing.

---

## 👥 Author
- **Marcos Burga** - Engineering Student