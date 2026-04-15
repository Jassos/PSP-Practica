## 1. Contexto del modulo
El Equipo 2 es responsable del modulo **Perfil de usuario** dentro de la practica PSP sobre una aplicacion CRUD.

## 2. Objetivo general
Implementar y validar la vista de perfil para que un usuario pueda visualizar su informacion principal (id, nombre, correo, fecha de registro) de forma clara, estable y sin exponer datos sensibles en pantalla.

## 3. Alcance del Equipo 2

### Incluye
- Vista de perfil en frontend.
- Carga de datos desde sesion local (`localStorage`) y refresco opcional desde API.
- Manejo de estados vacio, carga y error en la vista.
- Mensajes legibles para usuario final.

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Vista de perfil base: `frontend/src/pages/PerfilPage.jsx`.
- Cliente API con metodo `getUser(userId)`.
- End-point de consulta por usuario: `GET /api/users/{user_id}`.
- Ruta frontend: `/perfil`.

El equipo debe tomar esta base y mejorarla para que el flujo de perfil quede completo y estable.

## 4.1 End-point relacionado al Equipo 2 (principal)

Para este documento del Equipo 2, se considera como end-point principal de Perfil:

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Users/Perfil | GET | /api/users/{user_id} | Path | user_id | int | Si | Entero mayor a 0 | Identificador del usuario a consultar |

Respuesta de referencia para perfil en UI:
- `id`
- `full_name`
- `email`
- `created_at`

No forman parte del alcance de este equipo: registro, login, logout, productos ni dashboard.

## 5. Archivos clave para trabajar

### Backend
- `backend/app/routers/users.py`
- `backend/app/schemas.py`
- `backend/app/crud.py`

### Frontend
- `frontend/src/pages/PerfilPage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx`

## 6. Requerimientos funcionales obligatorios
1. La vista de perfil debe mostrar:
   - ID de usuario.
   - Nombre completo.
   - Correo.
   - Fecha de registro.
2. Si se hace refresco con API y ocurre error, debe mostrarse mensaje entendible sin romper la vista.
3. No se deben mostrar campos sensibles (por ejemplo, `password_hash`) en la interfaz.

## 7) Requerimientos tecnicos minimos
1. Mantener compatibilidad con el contrato actual del endpoint (`/api/users/{user_id}`).
2. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).
3. Evitar romper rutas ya existentes en frontend.

## 8) Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas (UI, lectura de sesion, integracion API, pruebas).
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento para casos:
  - sesion valida,
  - sesion ausente,
  - error de API,
  - dato sensible no renderizable.

### Fase 3 - Desarrollo
- Implementar interfaz visual completa de perfil.
- Integrar lectura de `localStorage("psp_session")`.
- Agregar refresco opcional con `api.getUser(userId)` y manejo de errores.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9) Checklist de pruebas manuales
1. Perfil visible con sesion valida en localStorage.
2. Perfil sin sesion (mensaje de estado vacio o redireccion controlada).
3. Refresco exitoso con `GET /api/users/{id}`.
4. Manejo de error cuando API no responde.
5. Verificacion de que no se renderiza `password_hash` aunque llegue en respuesta.
6. Verificacion de legibilidad en desktop y mobile.

## 10) Entregables del Equipo 2
1. Codigo funcional del modulo de Perfil (frontend y ajustes backend si aplican).
2. Evidencia de pruebas manuales (capturas o bitacora de casos).
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11) Criterios de aceptacion
- La informacion principal del usuario se visualiza correctamente.
- Los errores son perceptibles y comprensibles.
- No se exponen datos sensibles en la interfaz.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa.

## 12) Formato Esperado/Ideal

### Request ideal (consulta de perfil)

```http
GET /api/users/10
```

### Response ideal - exito (200)

```json
{
  "id": 10,
  "full_name": "Ana Perez",
  "email": "ana.perez@correo.com",
  "created_at": "2026-04-15T18:20:00"
}
```

### Response posible en estado base (200 con warning PSP)

```json
{
  "id": 10,
  "full_name": "Ana Perez",
  "email": "ana.perez@correo.com",
  "created_at": "2026-04-15T18:20:00",
  "password_hash": "$2b$12$...",
  "psp_warning": "BUG-USER-001: Se esta devolviendo password_hash en la respuesta."
}
```

### Response esperada - usuario no encontrado (404)

```json
{
  "detail": "Usuario no encontrado."
}
```

### Criterios de formato ideal

- Consultar con `Accept: application/json`.
- Mostrar en UI solo campos de perfil requeridos (`id`, `full_name`, `email`, `created_at`).
- Ignorar campos no requeridos o sensibles en renderizado.
- Si no existe sesion activa, manejar estado sin romper la navegacion.
