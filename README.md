# PSP Practica CRUD (Base Front + Back)

Proyecto base para practica de equipos con metodologia PSP.
Incluye backend en FastAPI, frontend en React (Vite) y SQLite con datos semilla.

## Tematica actual

La base maneja un catalogo de suplementos alimenticios (usuarios + productos).
Esto permite separar modulos de practica por equipo:

En Base al número de equipo, sera la rama correspondiente a su actividad a desarrollar.

1. TSP ALAN ALEJANDRO
2. SCRUM VILLEDO
3. XP EDWIN
4. DAS UBALDO
5. DEVOPS JESUS ANDRE
6. MLOPS JESUS ALEJANDRO
7. LSD ERICK
8. KANBAN GABRIEL
9. DDC JENNIFER

### Prototipo del Proyecto
Puedes consultar el prototipo y los componentes en el siguiente enlace:
[Ver diseño en Figma](https://www.figma.com/design/xdCC2idZrvNS4JmwVHwux3/PSP-M%C3%A9tricas?node-id=0-1&t=nz9cnuCoYsKwOoDS-1)

## Estructura

```text
backend/
  app/
    core/config.py
    db.py
    models.py
    schemas.py
    crud.py
    seed.py
    routers/
      auth.py
      users.py
      products.py
      dashboard.py
    main.py
  requirements.txt
frontend/
  src/
    api/client.js
    components/
    pages/
    App.jsx
    main.jsx
    styles.css
```

## Requisitos

- Python 3.11+ (recomendado)
- Node.js 18+ y npm

## Ejecucion completa (manual)

Este proyecto funciona sin archivo .env.
La configuracion principal esta en backend/app/core/config.py.

### 1) Levantar backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2) Levantar frontend

En otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

URLs locales:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Docs API (Swagger): http://localhost:8000/docs

## Datos semilla (SQLite)

Al arrancar el backend se crean tablas y datos iniciales automaticamente.

Usuarios iniciales (5):

- admin@pspdemo.com / admin123
- ana@pspdemo.com / equipo123
- carlos@pspdemo.com / suplemento123
- daniela@pspdemo.com / energia123
- erick@pspdemo.com / proteina123

Productos iniciales: 10 productos del rubro suplementos alimenticios.

Nota importante sobre seed:

- El seed solo corre si la tabla users esta vacia.
- Si ya tenias datos, no se volveran a insertar automaticamente.

## Endpoints principales (backend)

- POST /api/auth/register
- POST /api/auth/login
- GET /api/users
- GET /api/users/{user_id}
- POST /api/products
- GET /api/products
- GET /api/products/{product_id}
- PUT /api/products/{product_id}
- DELETE /api/products/{product_id}
- GET /api/dashboard/summary

## Estado de logout

- El endpoint de backend para cierre de sesion fue eliminado.
- Si en frontend se usa la ruta /logout, actualmente apuntara a una llamada no disponible en API.

## Bugs intencionales (practica PSP)

La base deja errores visibles para que los equipos los detecten y corrijan:

1. BUG-LOGIN-001: Login no bloquea contrasena incorrecta si el correo existe.
2. BUG-USER-001: GET /users/{id} expone password_hash.
3. BUG-CREATE-001: Crear producto trunca precio a entero.
4. BUG-UPDATE-001: Editar producto ignora el campo stock.
5. BUG-DELETE-001: Delete hace borrado logico, no fisico, pero responde como eliminado.
6. BUG-DASH-001: Dashboard reporta products_total incorrecto.

## Recomendacion de trabajo por equipos

- Cada equipo trabaja su modulo en su rama.
- No se aplica autenticacion real en endpoints para evitar bloqueo entre equipos.
- Cada equipo puede iterar su vista sin romper rutas compartidas.
