## 1. Contexto del modulo
El Equipo 3 es responsable del modulo **Iniciar sesion (Login)** dentro de la practica PSP sobre una aplicacion CRUD.

## 2. Objetivo general
Implementar y validar el flujo de login para que un usuario pueda autenticarse con correo y contrasena desde la vista de inicio de sesion, persistir la sesion local y navegar al dashboard con mensajes claros de exito o error.

## 3. Alcance del Equipo 3

### Incluye
- Vista de iniciar sesion en frontend.
- Consumo del endpoint de login.
- Validaciones minimas de formulario (cliente).
- Persistencia de sesion en `localStorage`.
- Mensajes de error/exito legibles para usuario.

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Endpoint de login: `POST /api/auth/login`.
- Esquema de entrada de login (`email`, `password`).
- Pagina de login en frontend.
- Cliente API con metodo `login`.
- Ruta frontend de acceso: `/login`.

El equipo debe tomar esta base y mejorarla para que el flujo quede completo y estable.

## 4.1 End-point relacionado al Equipo 3 (unico)

Para este documento del Equipo 3, solo se considera el end-point de Login:

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Auth/Login | POST | /api/auth/login | Body | email | email | Si | Formato de correo valido | Correo de la cuenta |
| Auth/Login | POST | /api/auth/login | Body | password | string | Si | Min 1, max 128 caracteres | Contrasena para autenticacion |

No forman parte del alcance de este equipo: registro, logout, perfil, usuarios, productos ni dashboard.

## 5. Archivos clave para trabajar

### Backend
- `backend/app/routers/auth.py`
- `backend/app/schemas.py`
- `backend/app/crud.py`

### Frontend
- `frontend/src/pages/IniciarSesionPage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx`

## 6. Requerimientos funcionales obligatorios
1. El formulario de inicio de sesion debe pedir:
   - Correo.
   - Contrasena.
2. Si los datos son validos y el login es exitoso, debe:
   - guardar la sesion (ej. `psp_session` en localStorage),
   - navegar a `/dashboard`,
   - mostrar confirmacion visual.
3. Si el usuario no existe o hay error de red/servidor, debe mostrar error entendible.
4. Si la API retorna `psp_warning`, la vista debe mostrar una alerta visible.

## 7) Requerimientos tecnicos minimos
1. Mantener compatibilidad con el contrato actual del endpoint (`/api/auth/login`).
2. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).
3. Evitar romper rutas ya existentes en frontend.

## 8) Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas (UI, validaciones, integracion, pruebas).
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento del formulario en casos:
  - exito,
  - usuario no encontrado,
  - warning PSP,
  - error inesperado de red/servidor.

### Fase 3 - Desarrollo
- Implementar mejoras de validacion y UX en la pagina de login.
- Ajustar manejo de errores en cliente API solo si es necesario.
- Verificar consistencia de payload con backend.
- Persistir sesion local y redirigir a dashboard.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9) Checklist de pruebas manuales
1. Login exitoso con correo y contrasena validos.
2. Login rechazado por usuario inexistente (404).
3. Error por correo invalido (422).
4. Error por contrasena vacia (422).
5. Verificacion de guardado de sesion (`psp_session`) tras exito.
6. Verificacion de navegacion a `/dashboard` tras exito.
7. Verificacion de alerta cuando llega `psp_warning`.
8. Verificacion de mensaje de error cuando API no responde.

## 10) Entregables del Equipo 3
1. Codigo funcional del modulo de Login (frontend y ajustes backend si aplican).
2. Evidencia de pruebas manuales (capturas o bitacora de casos).
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11) Criterios de aceptacion
- El flujo de inicio de sesion funciona de punta a punta.
- Los errores y warnings son perceptibles y comprensibles.
- La sesion local se guarda correctamente en exito.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa.

## 12) Formato Esperado/Ideal

### Request ideal (login)

```json
{
  "email": "ana.perez@correo.com",
  "password": "ClaveSegura123"
}
```

### Response ideal - exito (200)

```json
{
  "access_token": "token-psp-10",
  "token_type": "bearer",
  "user": {
    "id": 10,
    "full_name": "Ana Perez",
    "email": "ana.perez@correo.com",
    "created_at": "2026-04-15T18:20:00"
  }
}
```

### Response esperada - warning PSP (200)

```json
{
  "access_token": "token-psp-10",
  "token_type": "bearer",
  "user": {
    "id": 10,
    "full_name": "Ana Perez",
    "email": "ana.perez@correo.com",
    "created_at": "2026-04-15T18:20:00"
  },
  "psp_warning": "BUG-LOGIN-001: La contrasena incorrecta no bloquea el acceso."
}
```

### Response esperada - usuario no encontrado (404)

```json
{
  "detail": "Usuario no encontrado."
}
```

### Response esperada - error de validacion (422)

```json
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "input": "correo-invalido"
    }
  ]
}
```

### Criterios de formato ideal

- Enviar siempre `Content-Type: application/json`.
- `email` debe ser valido.
- `password` no debe enviarse vacia.
- Guardar la respuesta de login en `localStorage` cuando el estado sea exitoso.
